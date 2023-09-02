import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import useSectors from '../../core/hooks/useSectors';
import { Sector, WorkStation, WorkStationService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';

type WorkStationFormType = WorkStation.WorkStationModel;
interface WorkStationFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
  workStation?: WorkStationFormType;
  onUpdate?: (workStation: WorkStation.Input) => Promise<WorkStationFormType>;
}

export default function WorkStationForm(props: WorkStationFormDefaultProps) {
  const [form] = Form.useForm();
  const { sectors, fetchSectors } = useSectors();

  const { userAuth } = useAuth();

  const [fetching, setFetching] = useState<boolean>();
  const navigate = useNavigate();

  if (hasPermission('EDIT_WOK_STATIONS', userAuth))
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  useEffect(() => {
    fetchSectors({});
    form.resetFields();
  }, [fetchSectors, props.workStation]);

  function fetchOptions() {
    const options: Sector.SectorModel = [];
    sectors?._embedded?.sectors.map((sector: Sector.SectorModel) => {
      options.push({
        label: sector?.name,
        value: sector?.id,
      });
    });
    return options;
  }

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.workStation}
        onFinish={async (workStation: WorkStation.Input) => {
          setFetching(true);
          if (props.workStation) {
            return (
              props.onUpdate &&
              props.onUpdate(workStation).finally(() => {
                setFetching(false);
              })
            );
          }

          await WorkStationService.createWorkStation(workStation)
            .then((workStation: WorkStation.WorkStationModel) => {
              notification.success({
                message: 'Sucesso',
                description: `Estação de trabalho ${workStation?.name}  criada com sucesso`,
              }),
                navigate('/estacoes-de-trabalho');
            })
            .finally(() => {
              setFetching(false);
              form.resetFields();
            });
        }}
      >
        <Row justify={'space-between'} gutter={40}>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Nome:*"
              name={'name'}
              rules={[
                {
                  required: true,
                  message: 'O nome da Estação de Trabalho é obrigatório',
                },
              ]}
            >
              <Input placeholder="e.g: nome" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Localização:*"
              name={'localization'}
              rules={[
                {
                  required: true,
                  message: 'A localização é obrigatória',
                },
              ]}
            >
              <Input placeholder="e.g: localização" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Selecione o Setor:*"
              name={['sector', 'id']}
              rules={[
                {
                  required: true,
                  message: 'O Setor é obrigatório',
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Selecione a Estação de Trabalho"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={fetchOptions()}
              />
            </Form.Item>
          </Col>
        </Row>

        <ButtonForm
          loading={fetching}
          icon={{
            create: props.workStation ? <EditOutlined /> : <SaveOutlined />,
            cancel: <StopOutlined />,
            edit: <EditOutlined />,
          }}
          label={{
            save: props.workStation ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/estacoes-de-trabalho' }}
        />
      </Form>
    </WrapperDefault>
  );
}
