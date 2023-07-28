import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import { useEffect } from 'react';
import useSectors from '../../core/hooks/useSectors';
import { Sector, WorkStation, WorkStationService } from '../../sdk';
import CustomError from '../../sdk/CustomError';
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
  onUpdate?: (workStation: WorkStation.Input) => WorkStationFormType;
}

export default function WorkStationForm(props: WorkStationFormDefaultProps) {
  const [form] = Form.useForm();
  const { sectors, fetchSectors } = useSectors();

  useEffect(() => {
    fetchSectors();
    form.resetFields()
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
          try {
            if (props.workStation) {
              return props.onUpdate && props.onUpdate(workStation);
            }

            await WorkStationService.createWorkStation(workStation).then(
              (workStation: WorkStation.WorkStationModel) =>
                notification.success({
                  message: 'Sucesso',
                  description: `Estação de trabalho ${workStation?.name}  criada com sucesso`,
                }),
            );
          } catch (error: any) {
            if (error instanceof CustomError) {
              if (error.data?.objects) {
                form.setFields(
                  error.data.objects.map((error: any) => {
                    return {
                      name: error.name
                        ?.split(/(\.|\[|\])/gi)
                        .filter(
                          (str: string) =>
                            str !== '.' &&
                            str !== '[' &&
                            str !== ']' &&
                            str !== '',
                        )
                        .map((str: string) =>
                          isNaN(Number(str)) ? str : Number(str),
                        ) as string[],
                      errors: [error.userMessage],
                    };
                  }),
                );
              } else {
                notification.error({
                  message: error.message,
                  description:
                    error.data?.detail === 'Network Error'
                      ? 'Erro de Rede'
                      : error.data?.detail,
                });
              }
            } else {
              notification.error({
                message: `Houve um erro: ${error.message}`,
              });
            }
          }
        }}
       
      >
        <Row justify={'space-between'} gutter={40}>
          <Col xs={24} xl={8}>
            <Form.Item label="Nome:*" name={'name'}>
              <Input placeholder="e.g: nome" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Localização:*" name={'localization'}>
              <Input placeholder="e.g: localização" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Selecione o Setor:*" name={['sector', 'id']}>
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

        <Form.Item style={{ marginTop: 10 }}>
          <Space direction="horizontal">
            <Button
              type="primary"
              htmlType="submit"
              icon={props.iconButton.register}
            >
              {props.labelRegister}
            </Button>
            <Button type="primary" danger icon={props.iconButton.cancel}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
