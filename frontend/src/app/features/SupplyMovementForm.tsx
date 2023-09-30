import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import useSupplies from '../../core/hooks/useSupplies';
import useUsers from '../../core/hooks/useUsers';
import useWorkStations from '../../core/hooks/useWorkStations';
import { SupplyMovementService } from '../../sdk';
import { Supply, User } from '../../sdk/@types';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';

type SupplyMovementFormType = Supply.MovementModel;

interface SupplyMovementFormProps {
  title: string;
  supplyMovement?: SupplyMovementFormType;
  onUpdate?: (
    supplyMovement: Supply.MovementInput,
  ) => Promise<SupplyMovementFormType>;
}

export default function SupplyMovementForm(props: SupplyMovementFormProps) {
  const [form] = Form.useForm();
  const { lg } = useBreakpoint();

  const { users, fetchUsers } = useUsers();
  const { workStations, fetchWorkStations } = useWorkStations();
  const { supplies, fetchSupplies } = useSupplies();
  const [checked, setChecked] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>();
  const navigate = useNavigate();

  const { userAuth } = useAuth();

  useEffect(() => {
    fetchUsers({ sort: ['asc'] });
    fetchWorkStations({ sort: ['asc'] });
    fetchSupplies({ sort: ['asc'] });

    if (props.supplyMovement) {
      form.resetFields();
      form.setFieldValue(
        'reservedQuantity',
        props.supplyMovement?.allocatedQuantity,
      );
      if (props.supplyMovement?.movable !== undefined)
        setChecked(props.supplyMovement?.movable);
    }

    form.setFieldValue('movable', checked);
  }, [
    fetchUsers,
    fetchWorkStations,
    fetchSupplies,
    props.supplyMovement?.allocateQuantity,
    props.supplyMovement?.movable,
    checked,
    form,
  ]);

  const options = useCallback((list: any) => {
    return fetchOptions(list);
  }, []);
  function fetchOptions(list: any) {
    const options: any = [];
    list?.map((item: any) => {
      options.push({
        label: `${item?.id} - ${item?.name}`,
        value: item?.id,
      });
    });
    return options;
  }

  const optionsUsers = useCallback((list: any) => {
    return fetchOptionsUsers(list);
  }, []);
  function fetchOptionsUsers(list: User.Detailed) {
    const options: any = [];
    list?.map((item: any) => {
      options.push({
        label: item?.name,
        value: item?.id,
      });
    });
    return options;
  }

  return (
    <WrapperDefault title={props.title}>
      <Form
        initialValues={props.supplyMovement}
        layout={'vertical'}
        form={form}
        onFinish={async (movement: Supply.MovementInput) => {
          setFetching(true);
          if (props.supplyMovement)
            return (
              props.onUpdate &&
              props.onUpdate(movement).finally(() => {
                setFetching(false);
              })
            );

          await SupplyMovementService.createSupplyMovement(movement)
            .then((movement: Supply.MovementModel) => {
              notification.success({
                message: 'Sucesso',
                description: `Movimento do Recurso ${movement?.supply?.name} criado com sucesso`,
              }),
              navigate('/movimento-recursos');
            })
            .finally(() => {
              setFetching(false);
            });
        }}
      >
        <Row justify={'space-between'} gutter={50}>
          <Col xs={24} lg={12}>
            <Divider orientation="left">DADOS DO MOVIMENTO</Divider>
            <Row justify={'space-between'} gutter={30}>
              <Col xs={24}>
                <Form.Item
                  name={'movable'}
                  label={<strong>Movimentável?</strong>}
                  style={lg ? { marginBottom: 32 } : { marginBottom: 0 }}
                >
                  <Checkbox
                    onChange={() => {
                      setChecked(!checked);
                      delete props.supplyMovement?.movable;
                    }}
                    checked={checked}
                  >
                    MOVIMENTÁVEL
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} xl={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'A quantidade reservada é obrigatória',
                    },
                  ]}
                  name={'reservedQuantity'}
                  label="Quantidade Reservada:"
                >
                  <InputNumber
                    placeholder="ex: 10"
                    size="large"
                    min={1}
                    max={1000}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={16}>
                {' '}
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'O Responsável é obrigatório',
                    },
                  ]}
                  name={['employeeResponsible', 'id']}
                  label="Colaborador Responsável:"
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Selecione o Colaborador responsável"
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    //@ts-ignore
                    options={optionsUsers(users?._embedded?.users)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item
                  name={['supply', 'id']}
                  label="Recurso:"
                  rules={[
                    {
                      required: true,
                      message: 'O recurso é obrigatório',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Selecione o Recurso"
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={options(supplies?._embedded?.supplies)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'A Estação de Trabalho é obrigatória',
                    },
                  ]}
                  name={['workStation', 'id']}
                  label="Estação de Trabalho*"
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
                    options={options(workStations?._embedded?.workStations)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            <Divider orientation="left">NOTIFICAÇÃO</Divider>
            <Row justify={'space-between'} gutter={30}>
              <Col xs={24}>
                <Form.Item
                  name={['notification', 'title']}
                  label="Título:"
                  rules={[
                    {
                      required: true,
                      message: 'O Título é obrigatório',
                    },
                  ]}
                >
                  <Input
                    placeholder="ex: Revestimento do Bloco B"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name={['notification', 'goal']}
                  label="Objetivo:"
                  rules={[
                    {
                      required: true,
                      message: 'O objetivo é obrigatório',
                    },
                  ]}
                >
                  <Input
                    placeholder="ex: Regularização de paredes concluídas"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name={['notification', 'reason']}
                  label="Razão:"
                  rules={[
                    {
                      required: true,
                      message: 'A razão é orbigatória',
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    maxLength={300}
                    placeholder="e.g.: O Revestimento deve ser executado, pois precisamos executar o gesso e as paredes. Sem o revestimento, tais serviços não podem ser executados!"
                    size="large"
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <ButtonForm
          loading={fetching}
          icon={{
            create: props.supplyMovement ? <EditOutlined /> : <SaveOutlined />,
            cancel: <StopOutlined />,
          }}
          label={{
            save: props.supplyMovement ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/movimento-recursos' }}
        />
      </Form>
    </WrapperDefault>
  );
}
