import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSupplies from '../../core/hooks/useSupplies';
import useUsers from '../../core/hooks/useUsers';
import useWorkStations from '../../core/hooks/useWorkStations';
import { Supply, SupplyMovementService } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import WrapperDefault from '../components/WrapperDefault';

type SupplyMovementFormType = Supply.MovementModel;

interface SupplyMovementFormProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
  supplyMovement?: SupplyMovementFormType;
  onUpdate?: (supplyMovement: Supply.MovementInput) => SupplyMovementFormType;
}

export default function SupplyMovementForm(props: SupplyMovementFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { lg } = useBreakpoint();

  const { users, fetchUsers } = useUsers();
  const { workStations, fetchWorkStations } = useWorkStations();
  const { supplies, fetchSupplies } = useSupplies();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
    fetchWorkStations();
    fetchSupplies();
    form.setFieldValue('movable', checked)
  }, [fetchUsers, fetchWorkStations, fetchSupplies, checked]);

  const options = useCallback((list: any) => {
    return fetchOptions(list);
  }, []);
  function fetchOptions(list: any) {
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
        layout={'vertical'}
        form={form}
        //initialValues={'props.assignment'}
        onFinish={async (movement: Supply.MovementInput) => {
          try {
            /*if (props.assignment) {
              return props.onUpdate && props.onUpdate(assignmentDTO);
            }*/
            await SupplyMovementService.createSupplyMovement(movement).then(
              (movement: Supply.MovementModel) =>
                notification.success({
                  message: 'Sucesso',
                  description: 'Movimento criado com sucesso',
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
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                  >
                    MOVIMENTÁVEL
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} xl={8}>
                <Form.Item
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
                    options={options(users?._embedded?.users)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name={['supply', 'id']} label="Recurso:">
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
                <Form.Item name={['notification', 'title']} label="Título:">
                  <Input
                    placeholder="ex: Revestimento do Bloco B"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name={['notification', 'goal']} label="Objetivo:">
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
                      message: 'A Razão é obrigatória',
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    maxLength={500}
                    placeholder="e.g.: O Revestimento deve ser executado, pois precisamos executar o gesso e as paredes. Sem o revestimento, tais serviços não podem ser executados!"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item>
          <Space direction="horizontal">
            <Button
              type="primary"
              htmlType="submit"
              icon={props.iconButton.register}
            >
              {props.labelRegister}
            </Button>
            <Link to={'/movimento-recursos'}>
              <Button type="primary" danger icon={props.iconButton.cancel}>
                Cancelar
              </Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
