import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWorkStations from '../../core/hooks/useWorkStations';
import { Assignment, AssignmentService, WorkStation } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import WrapperDefault from '../components/WrapperDefault';

import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import AccessDenied from '../components/AccessDenied';

type AssignmentFormType = Assignment.AssignmentModel;
interface AssignmentFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
  assignment?: AssignmentFormType;
  onUpdate?: (user: Assignment.AssignmentInput) => AssignmentFormType;
}

export default function TaskForm(props: AssignmentFormDefaultProps) {
  const [form] = Form.useForm();
  const dateFormat = 'DD/MM/YYYY';
  const { fetchWorkStations, workStations } = useWorkStations();
  const { userAuth } = useAuth();

  if (!hasPermission('EDIT_SUPPLIES', userAuth))
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  const option = useCallback(() => {
    return fetchOptions();
  }, [fetchOptions]);

  function fetchOptions() {
    const options: WorkStation.WorkStationModel = [];
    workStations?._embedded?.workStations.map(
      (workStation: WorkStation.WorkStationModel) => {
        options.push({
          label: `${workStation.name} - ${workStation.localization}`,
          value: workStation.id,
        });
      },
    );
    return options;
  }

  useEffect(() => {
    fetchWorkStations();
  }, [fetchWorkStations]);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.assignment}
        onFinish={async (assignment: Assignment.AssignmentInput) => {
          try {
            const assignmentDTO: Assignment.AssignmentInput = {
              ...assignment,
              nature: assignment.nature?.toUpperCase(),
              startDate: assignment.startDate
                ? new Date(assignment.startDate).toISOString()
                : '',
              deadline: assignment.deadline
                ? new Date(assignment.deadline).toISOString()
                : '',
            };

            if (props.assignment) {
              return props.onUpdate && props.onUpdate(assignmentDTO);
            }

            await AssignmentService.createAssignment(assignmentDTO).then(
              (assignment: Assignment.AssignmentModel) =>
                notification.success({
                  message: 'Sucesso',
                  description: `Tarefa ${assignment?.title}  criada com sucesso`,
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
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={15}>
            <Form.Item label="Título" name="title">
              <Input size="large" placeholder="ex: Título" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={9}>
            <Form.Item label="Data de Início" name="startDate">
              <DatePicker
                style={{ width: '100%' }}
                locale={locale}
                format={dateFormat}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={8}>
            <Form.Item label="Prazo para Conclusão" name="deadline">
              <DatePicker
                style={{ width: '100%' }}
                locale={locale}
                format={dateFormat}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Tipo da Tarefa" name="nature">
              <Select
                size="large"
                placeholder="Selecione o Tipo da Tarefa"
                options={[
                  {
                    label: 'Obras',
                    value: 'Obras',
                  },
                  { label: 'Limpeza', value: 'Limpeza' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Estação de Trabalho" name={['workStation', 'id']}>
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
                options={option()}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">NOTIFICAÇÃO</Divider>
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} lg={12}>
            <Form.Item label="Título" name={['notification', 'title']}>
              <Input size="large" placeholder="e.g: Título" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item label="Objetivo" name={['notification', 'goal']}>
              <Input size="large" placeholder="e.g: Objetivo" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Razão" name={['notification', 'reason']}>
              <TextArea size="large" placeholder="e.g: Razão" />
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
            <Link to={'/tarefas'}>
              {' '}
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
