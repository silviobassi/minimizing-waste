import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReconciliationOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { ColumnProps } from 'antd/es/table';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import useAssignments from '../../core/hooks/useAssignments';
import useAuth from '../../core/hooks/useAuth';
import { Assignment } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import ReloadList from '../components/ReloadList';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskList() {
  const navigate = useNavigate();
  const { assignments, fetchAssignments, fetching } = useAssignments();
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { removeAssignment, toggleComplete, toggleApprove } = useAssignment();
  const [page, setPage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>();
  const [searchDate, setSearchDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [approveDate, setApproveDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [assignmentTitle, setAssignmentTitle] = useState<string | undefined>();
  const { userAuth } = useAuth();
  const { xs, md, sm, lg } = useBreakpoint();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAssignments({
      page,
      size: 4,
      sort: ['asc'],
      assignmentTitle,
      startDate,
      endDate,
      approveDate,
      deadline,
    }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }
      //throw err;
    });
    //2023-08-23T00:00:00Z

    console.log(startDate);
  }, [
    fetchAssignments,
    page,
    checked,
    assignmentTitle,
    searchDate,
    startDate,
    endDate,
    deadline,
  ]);
  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const search: any = {
    concluded: (
      <DatePicker.RangePicker
        locale={locale}
        style={{ display: 'flex', justifySelf: 'end' }}
        size="large"
        onChange={(_, date: string[]) => {
          setStartDate(moment(date[0]).toISOString());
          setEndDate(moment(date[1]).toISOString());
        }}
      />
    ),
    approved: (
      <DatePicker.RangePicker
        locale={locale}
        style={{ display: 'flex', justifySelf: 'end' }}
        size="large"
        onChange={(_, date: string[]) => {
          setStartDate(moment(date[0]).toISOString());
          setApproveDate(moment(date[1]).toISOString());
        }}
      />
    ),
    finished: (
      <DatePicker.RangePicker
        locale={locale}
        style={{ display: 'flex', justifySelf: 'end' }}
        size="large"
        onChange={(_, date: string[]) => {
          setStartDate(moment(date[0]).toISOString());
          setDeadline(moment(date[1]).toISOString());
        }}
      />
    ),
  };

  const getColumnSearchProps = (
    dataIndex: keyof Assignment.PagedModelAssignment,
    displayName?: string,
  ): ColumnProps<Assignment.PagedModelAssignment> => ({
    filterDropdown: ({}) => (
      <Card>
        <Form form={form}>
          <Form.Item name={'name'}>
            <Input
              type="text"
              //@ts-ignore
              placeholder={`Buscar ${displayName || dataIndex}`}
              onChange={(e) => {
                setAssignmentTitle(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  return (
    <>
      <Row justify={'space-between'} gutter={20} align={'middle'}>
        <Col xs={24} lg={5}>
          <Space
            style={{ width: '100%' }}
            direction={xs ? 'vertical' : 'horizontal'}
          >
            <ReloadList onReload={fetchAssignments} />
            <Button
              style={
                xs || sm
                  ? { width: '100%', marginBottom: 20 }
                  : { marginBottom: 0 }
              }
              type={'primary'}
              size={'large'}
              onClick={() => navigate('/tarefa/criar')}
            >
              CRIAR TAREFAS
            </Button>
          </Space>
        </Col>
        <Col xs={24} lg={11}>
          <Form>
            <Form.Item name="search">
              <Select
                onChange={(e) => setSearchDate(e)}
                size="large"
                placeholder="Selecione o Tipo da Pesquisa"
                options={[
                  {
                    label: 'TAREFAS COM DATAS DE FINALIZAÇÃO',
                    value: 'concluded',
                  },
                  {
                    label: 'TAREFAS COM DATAS DE APROVAÇÃO',
                    value: 'approved',
                  },
                  {
                    label: 'PRAZO PARA CONCLUSÃO DA TAREFA',
                    value: 'finished',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} lg={8}>
          {search[searchDate]}
        </Col>
      </Row>

      <Divider />

      <WrapperDefault title="Lista de Tarefas">
        {xs && (
          <Input
            onChange={(e) => setAssignmentTitle(e.target.value)}
            placeholder="Buscar por Título"
            type="text"
            style={{ width: '100%', marginBottom: 30, marginTop: 20 }}
          />
        )}
        <Table<Assignment.PagedModelAssignment>
          loading={fetching}
          dataSource={assignments?._embedded?.assignments}
          columns={[
            {
              title: 'Recursos',
              responsive: ['xs'],
              render(assignment: Assignment.PagedModelAssignment) {
                return (
                  <Space direction="vertical">
                    <Descriptions column={1} size={'small'}>
                      <Descriptions.Item label={'Título'}>
                        <Row>{assignment?.title}</Row>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Estação'}>
                        {assignment?.workStation?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Prazo Conclusão'}>
                        <Space size={'small'} direction="vertical">
                          {moment(assignment?.startDate).format('DD/MM/YYYY')}
                          {moment(assignment?.deadline).format('DD/MM/YYYY')}
                        </Space>
                      </Descriptions.Item>
                      <Space direction="vertical" size={'middle'}></Space>
                      <Descriptions.Item label={'Finalização'}>
                        {assignment?.endDate ? (
                          moment(assignment?.endDate).format('DD/MM/YYYY')
                        ) : (
                          <Tag color="green">A FINALIZAR</Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Aprovação'}>
                        {assignment?.approveDate ? (
                          moment(assignment?.approveDate).format('DD/MM/YYYY')
                        ) : (
                          <Tag color="green">A APROVAR</Tag>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item>
                        <Space
                          size={'small'}
                          style={{ marginBottom: 15, marginTop: 15 }}
                        >
                          <Checkbox
                            checked={assignment?.completed}
                            onChange={async () => {
                              if (assignment?.completed) {
                                await toggleComplete(
                                  { completed: !assignment?.completed },
                                  assignment.id,
                                );
                                return;
                              }
                              await toggleComplete(
                                {
                                  completed: !assignment?.completed,
                                  endDate: new Date().toISOString(),
                                },
                                assignment.id,
                              );
                            }}
                          >
                            {assignment?.completed ? (
                              <Tag color="blue">FINALIZADA</Tag>
                            ) : (
                              <Tag color="red">PENDENTE</Tag>
                            )}
                          </Checkbox>
                          <Checkbox
                            checked={assignment?.approved}
                            onChange={async () => {
                              if (assignment?.approved) {
                                await toggleApprove(
                                  { approved: !assignment?.approved },
                                  assignment.id,
                                );

                                return;
                              }
                              await toggleApprove(
                                {
                                  approved: !assignment?.approved,
                                  approveDate: new Date().toISOString(),
                                },
                                assignment.id,
                              );
                            }}
                          >
                            {assignment?.approved ? (
                              <Tag color="blue">APROVADA</Tag>
                            ) : (
                              <Tag color="red">PENDENTE</Tag>
                            )}
                          </Checkbox>
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Ações'}>
                        <Tooltip title={'Editar'}>
                          <Button
                            type={'link'}
                            icon={<EditOutlined />}
                            onClick={() =>
                              navigate(`/tarefa/editar/${assignment.id}`)
                            }
                          />
                        </Tooltip>

                        <DoubleConfirm
                          popConfirmTitle="Remover Tarefa?"
                          popConfirmContent="Deseja mesmo remover esta tarefa?"
                          onConfirm={async () => {
                            await removeAssignment(Number(assignment.id));
                            notification.success({
                              message: 'Sucesso',
                              description: `Tarefa ${assignment.title}  removida com sucesso`,
                            });
                          }}
                        >
                          <Tooltip title={'Excluir'} placement="bottom">
                            <Button type="link">
                              <DeleteOutlined />
                            </Button>
                          </Tooltip>
                        </DoubleConfirm>

                        <Tooltip title={'Atribuir Tarefa'}>
                          <Button
                            type={'link'}
                            icon={<ReconciliationOutlined />}
                            onClick={() =>
                              navigate(`/tarefa/${assignment.id}/atribuicao`)
                            }
                          />
                        </Tooltip>
                        <Tooltip title={'Desatribuir Tarefa'}>
                          <Button
                            type={'link'}
                            icon={<ReconciliationOutlined />}
                            onClick={() =>
                              navigate(`/tarefa/${assignment.id}/desatribuicao`)
                            }
                          />
                        </Tooltip>
                        <Tooltip title={'Ver Detalhes'}>
                          <Link to={`/tarefas/${assignment.id}/detalhes`}>
                            <Button type={'link'} icon={<EyeOutlined />} />
                          </Link>
                        </Tooltip>
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                );
              },
            },
            { title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'] },
            {
              title: 'Título',
              dataIndex: 'title',
              responsive: ['sm'],
              ...getColumnSearchProps('title', 'Título'),
              width: 400,
            },

            {
              title: 'Prazo para Conclusão',
              dataIndex: 'startDate',
              align: 'center',
              width: 350,
              responsive: ['sm'],
              render(_: any, assignment) {
                return `${format(
                  new Date(assignment?.startDate),
                  'dd/MM/yyyy',
                )}  a 
                ${format(new Date(assignment?.deadline), 'dd/MM/yyyy')}`;
              },
            },

            {
              title: 'Data da Finalização',
              dataIndex: 'endDate',
              align: 'center',
              width: 60,
              responsive: ['sm'],
              render(endDate: string) {
                return endDate ? (
                  format(new Date(endDate), 'dd/MM/yyyy')
                ) : (
                  <Tag color="green">A FINALIZAR</Tag>
                );
              },
            },

            {
              title: 'Data da Aprovação',
              dataIndex: 'approveDate',
              align: 'center',
              width: 60,
              responsive: ['sm'],
              render(approveDate: string) {
                return approveDate ? (
                  format(new Date(approveDate), 'dd/MM/yyyy')
                ) : (
                  <Tag color="green">A APROVAR</Tag>
                );
              },
            },

            {
              title: 'Finalização',
              dataIndex: 'completed',
              align: 'center',
              responsive: ['sm'],
              render(_: any, assignment) {
                return (
                  <Checkbox
                    checked={assignment?.completed}
                    onChange={async () => {
                      if (assignment?.completed) {
                        await toggleComplete(
                          { completed: !assignment?.completed },
                          assignment.id,
                        );
                        return;
                      }
                      await toggleComplete(
                        {
                          completed: !assignment?.completed,
                          endDate: new Date().toISOString(),
                        },
                        assignment.id,
                      );
                    }}
                  >
                    {assignment?.completed ? (
                      <Tag color="blue">FINALIZADA</Tag>
                    ) : (
                      <Tag color="red">PENDENTE</Tag>
                    )}
                  </Checkbox>
                );
              },
            },
            {
              title: 'Verificação',
              dataIndex: 'approved',
              align: 'center',
              responsive: ['sm'],
              render(_: any, assignment) {
                return (
                  <Checkbox
                    checked={assignment?.approved}
                    onChange={async () => {
                      if (assignment?.approved) {
                        await toggleApprove(
                          { approved: !assignment?.approved },
                          assignment.id,
                        );

                        return;
                      }
                      await toggleApprove(
                        {
                          approved: !assignment?.approved,
                          approveDate: new Date().toISOString(),
                        },
                        assignment.id,
                      );
                    }}
                  >
                    {assignment?.approved ? (
                      <Tag color="blue">APROVADA</Tag>
                    ) : (
                      <Tag color="red">PENDENTE</Tag>
                    )}
                  </Checkbox>
                );
              },
            },

            {
              title: 'Ações',
              dataIndex: 'actions',
              align: 'center',
              width: 200,
              responsive: ['sm'],
              render: (_: any, assignment) => (
                <Space size={'small'}>
                  <Tooltip title={'Editar'}>
                    <Button
                      type={'link'}
                      icon={<EditOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/editar/${assignment.id}`)
                      }
                    />
                  </Tooltip>

                  <DoubleConfirm
                    popConfirmTitle="Remover Tarefa?"
                    popConfirmContent="Deseja mesmo remover esta tarefa?"
                    onConfirm={async () => {
                      await removeAssignment(Number(assignment.id));
                      notification.success({
                        message: 'Sucesso',
                        description: `Tarefa ${assignment.title}  removida com sucesso`,
                      });
                    }}
                  >
                    <Tooltip title={'Excluir'} placement="bottom">
                      <Button type="link">
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </DoubleConfirm>

                  <Tooltip title={'Atribuir Tarefa'}>
                    <Button
                      type={'link'}
                      icon={<ReconciliationOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/${assignment.id}/atribuicao`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title={'Desatribuir Tarefa'}>
                    <Button
                      type={'link'}
                      icon={<ReconciliationOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/${assignment.id}/desatribuicao`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title={'Ver Detalhes'}>
                    <Link to={`/tarefas/${assignment.id}/detalhes`}>
                      <Button type={'link'} icon={<EyeOutlined />} />
                    </Link>
                  </Tooltip>
                </Space>
              ),
            },
          ]}
          pagination={{
            onChange: (page: number) => setPage(page - 1),
            total: assignments?.page?.totalElements,
            pageSize: 4,
          }}
          rowKey="id"
        />
      </WrapperDefault>
    </>
  );
}
