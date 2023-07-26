import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Space,
  Tag,
  notification,
} from 'antd';

import { format } from 'date-fns';

import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Assignment, User } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';
import EmployeesResponsible from '../components/EmployeesResponsible';
import WrapperDefault from '../components/WrapperDefault';

type UserAssignedType = User.PagedModelUserAssigned;
type AssignmentType = Assignment.AssignmentModel;

interface AssignmentAssignedProps {
  users?: UserAssignedType;
  assignment?: AssignmentType;
  onAssigned?: (
    notification: Assignment.AssignmentNotificationInput,
    employeeId: number,
  ) => any;
  onPage: (page: number) => any;
  assign: boolean;
}

export default function AssignmentAssigned(props: AssignmentAssignedProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm<Assignment.AssignmentNotificationInput>();
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>();

  return (
    <WrapperDefault title="Atribuição de Tarefas">
      <Row justify={'space-between'}>
        <Col xs={24} xl={9}>
          <Divider orientation="left">TAREFA A ATRIBUIR</Divider>

          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'Prazo para Conclusão'}>
              <Space direction="horizontal">
                <Tag color="red">
                  {format(new Date(props?.assignment?.deadline), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Tipo da Tarefa'}>
              {props?.assignment?.nature}
            </Descriptions.Item>
            <Descriptions.Item label={'Setor'}>
              {props?.assignment?.workStation?.sector?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Estação de Trabalho'}>
              {props?.assignment?.workStation?.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Responsáveis pela Tarefa</Divider>
          {props?.assignment?.employeesResponsible.map(
            (employee: User.Assigned, key: number) => {
              return (
                <EmployeesResponsible
                  key={key}
                  isAssignScreen={true}
                  employeeResponsible={employee}
                />
              );
            },
          )}
        </Col>
        <Col xs={24} xl={12}>
          <Divider orientation="left">
            {props.assign
              ? 'COLABORADORES QUE PODEM SER ATRIBUÍDOS'
              : 'COLABORADORES QUE PODEM SER DESATRIBUÍDOS'}
          </Divider>

          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={props?.users?._embedded?.users}
            renderItem={(employee: User.Assigned) => (
              <>
                <List.Item
                  actions={[
                    props.assign ? (
                      <Button
                        type="primary"
                        onClick={() => {
                          setOpen(true);
                          setUserId(employee?.id);
                          setUserName(employee?.name);
                        }}
                      >
                        ATRIBUIR
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          setOpen(true);
                          setUserId(employee?.id);
                          setUserName(employee?.name);
                        }}
                      >
                        DESATRIBUIR
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={employee?.userPhoto?.url}
                        size={50}
                        icon={<UserOutlined />}
                      />
                    }
                    title={<a href="#">{employee?.name}</a>}
                    description={
                      <>
                        <span>
                          <strong>Cargo: </strong>
                          {employee?.office} | <strong>Função: </strong>
                          {employee?.occupation}
                        </span>
                        <br />
                        <strong>WhatsApp: </strong>
                        {phoneToFormat(employee?.whatsApp)}
                      </>
                    }
                  />
                </List.Item>
                <Modal
                  title="Notificação"
                  open={open}
                  footer={null}
                  closable={false}
                >
                  <Form
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    onFinish={async (
                      notice: Assignment.AssignmentNotificationInput,
                    ) => {
                      try {
                        await props.onAssigned(notice, Number(userId));

                        notification.success({
                          message: 'Sucesso',
                          description: `Colaborador ${userName} ${
                            props.assign ? 'atribuído' : 'desatribuído'
                          } com sucesso`,
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
                      rules={[
                        {
                          required: true,
                          message: 'O título é obrigatório',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="eg.: Seu Título" />
                    </Form.Item>
                    <Form.Item
                      label="Motivo:*"
                      name={['notification', 'reason']}
                      rules={[
                        {
                          required: true,
                          message: 'O motivo é obrigatório',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="eg.: Seu motivo" />
                    </Form.Item>
                    <Form.Item
                      label="Objetivo:*"
                      name={['notification', 'goal']}
                      rules={[
                        {
                          required: true,
                          message: 'O título é obrigatório',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="eg.: Seu objetivo" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: 40 }}>
                      <Space direction="horizontal">
                        {props.assign ? (
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<UserAddOutlined />}
                          >
                            ASSOCIAR
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            danger
                            htmlType="submit"
                            icon={<UserDeleteOutlined />}
                          >
                            DESASSOCIAR
                          </Button>
                        )}

                        <Button danger onClick={() => setOpen(false)}>
                          CANCELAR
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
            pagination={{
              onChange: props.onPage,
              total: props?.users?.page?.totalElements,
              pageSize: 4,
            }}
          />
        </Col>
      </Row>
    </WrapperDefault>
  );
}
