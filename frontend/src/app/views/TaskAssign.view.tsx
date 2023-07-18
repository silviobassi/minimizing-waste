import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Skeleton,
  Space,
  Tag,
  notification,
} from 'antd';

import { format } from 'date-fns';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import useUsers from '../../core/hooks/useUsers';
import usePageTitle from '../../core/usePageTitle';
import { Assignment, AssignmentService, User } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskAssignView() {
  usePageTitle('Atribuição de Tarefas');

  const params = useParams<{ assignmentId: string }>();

  const { assignment, fetchAssignment, notFound } = useAssignment();
  const { usersAssignmentsAssigned, fetchUserAssignmentsAssigned } = useUsers();
  const [page, setPage] = useState<number>(0);
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm<Assignment.AssignmentNotificationInput>();

  useEffect(() => {
    if (!isNaN(Number(params.assignmentId))) {
      fetchAssignment(Number(params.assignmentId));
    }

    fetchUserAssignmentsAssigned(
      page,
      false,
      Number(params.assignmentId),
    ).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [
    fetchAssignment,
    params.assignmentId,
    fetchUserAssignmentsAssigned,
    page,
  ]);

  if (accessDeniedError) return <AccessDenied />;

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;

  if (!assignment) return <Skeleton />;

  return (
    <WrapperDefault title="Atribuição de Tarefas">
      <Row justify={'space-between'}>
        <Col xs={24} xl={9}>
          <Divider orientation="left">TAREFA A ATRIBUIR</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'Prazo para Conclusão'}>
              <Space direction="horizontal">
                <Tag color="red">
                  {format(new Date(assignment?.deadline), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Tipo da Tarefa'}>
              {assignment?.nature}
            </Descriptions.Item>
            <Descriptions.Item label={'Setor'}>
              {assignment?.workStation?.sector?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Estação de Trabalho'}>
              {assignment?.workStation?.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Responsáveis pela Tarefa</Divider>

          {assignment?.employeesResponsible.map(
            (employeeResponsible: Assignment.AssignmentModel) => (
              <>
                <Tag color="blue">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={'Nome'}>
                      {employeeResponsible?.name}
                    </Descriptions.Item>

                    <Descriptions.Item label={'Cargo'}>
                      {employeeResponsible?.office}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {employeeResponsible?.occupation}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {phoneToFormat(employeeResponsible?.whatsApp)}
                    </Descriptions.Item>
                  </Descriptions>
                </Tag>
              </>
            ),
          )}
        </Col>
        <Col xs={24} xl={12}>
          <Divider orientation="left">
            COLABORADORES DISPONÍVEIS À ASSOCIAÇÃO
          </Divider>

          <List
            itemLayout="horizontal"
            dataSource={usersAssignmentsAssigned?._embedded?.users}
            renderItem={(user: User.Assigned) => (
              <>
                <List.Item>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label={'Nome'}>
                      {user?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Cargo'}>
                      {user?.office}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {user?.occupation}
                    </Descriptions.Item>
                  </Descriptions>
                  <Button type="primary" onClick={() => setOpen(true)}>
                    ASSOCIAR
                  </Button>
                </List.Item>
                <Modal title="Notificação" open={open}>
                  <Form
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    onFinish={async (
                      notice: Assignment.AssignmentNotificationInput,
                    ) => {
                      try {
                        await AssignmentService.associateEmployee(
                          notice,
                          Number(params.assignmentId),
                          Number(user?.id),
                        );

                        notification.success({
                          message: 'Sucesso',
                          description: `Colaborador ${user?.name} associado com sucesso`,
                        });
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
                    <Form.Item
                      label="Título:*"
                      name={['notification', 'title']}
                    >
                      <Input size="large" placeholder="eg.: Seu Título" />
                    </Form.Item>
                    <Form.Item
                      label="Motivo:*"
                      name={['notification', 'reason']}
                    >
                      <Input size="large" placeholder="eg.: Seu motivo" />
                    </Form.Item>
                    <Form.Item
                      label="Objetivo:*"
                      name={['notification', 'goal']}
                    >
                      <Input size="large" placeholder="eg.: Seu objetivo" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: 40 }}>
                      <Space direction="horizontal">
                        <Button type="primary" htmlType="submit">
                          ASSOCIAR
                        </Button>
                        <Button type="primary" onClick={() => setOpen(false)}>
                          CANCELAR
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
            pagination={{
              onChange: (page: number) => setPage(page - 1),
              total: usersAssignmentsAssigned?.page?.totalElements,
              pageSize: 4,
            }}
          />
        </Col>
      </Row>
    </WrapperDefault>
  );
}
