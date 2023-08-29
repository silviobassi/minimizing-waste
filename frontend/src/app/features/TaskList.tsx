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
import { ColumnProps } from 'antd/es/table';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  hasEmployeeCurrent,
  hasPermission,
} from '../../auth/utils/isAuthenticated';
import useAssignment from '../../core/hooks/useAssignment';
import useAssignments from '../../core/hooks/useAssignments';
import useAuth from '../../core/hooks/useAuth';
import { Assignment } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskList() {
  const navigate = useNavigate();
  const { assignments, fetchAssignments } = useAssignments();
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { removeAssignment, toggleComplete, toggleApprove } = useAssignment();
  const [page, setPage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>();
  const [searchDate, setSearchDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [assignmentTitle, setAssignmentTitle] = useState<string | undefined>();
  const { userAuth } = useAuth();

  useEffect(() => {
    fetchAssignments({
      page,
      size: 4,
      sort: ['asc'],
      assignmentTitle,
      startDate: moment(startDate).toISOString(),
      endDate: moment(endDate).toISOString(),
      deadline: moment(deadline).toISOString(),
    }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }
      //throw err;
    });
console.log(moment(deadline).toISOString())
    //2023-08-23T00:00:00Z
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
      <Space direction="horizontal">
        <DatePicker.RangePicker
          size="large"
          onChange={(_, date: string[]) => {
            
            setStartDate(date[0]);
            setEndDate(date[1]);
          }}
        />
      </Space>
    ),
    finished: (
      <Space>
        <DatePicker.RangePicker
          size="large"
        
          
          onChange={(_, date: string[]) => {
            setStartDate(date[0]);
            setDeadline(date[1]);
          }}
        />
      </Space>
    ),
  };

  const getColumnSearchProps = (
    dataIndex: keyof Assignment.PagedModelAssignment,
    displayName?: string,
  ): ColumnProps<Assignment.PagedModelAssignment> => ({
    filterDropdown: ({}) => (
      <Card>
        <Input
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setAssignmentTitle(e.target.value);
          }}
        />
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  return (
    <>
      <Row justify={'space-between'} gutter={30}>
        <Col xs={24} lg={4}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={() => navigate('/tarefa/criar')}
          >
            CRIAR TAREFAS
          </Button>
        </Col>
        <Col xs={24} lg={10}>
          <Form.Item label="Tipo da Tarefa" name="nature">
            <Select
              onChange={(e) => setSearchDate(e)}
              size="large"
              placeholder="Selecione o Tipo da Pesquisa"
              options={[
                {
                  label: 'PRAZO PARA CONCLUSÃO DA TAREFA',
                  value: 'concluded',
                },
                { label: 'DATA DA FINALIZAÇÃO DA TAREFA', value: 'finished' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={10}>
          {search[searchDate]}
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <WrapperDefault title="Lista de Tarefas">
        <Table<Assignment.PagedModelAssignment>
          dataSource={assignments?._embedded?.assignments}
          columns={[
            { title: 'ID', dataIndex: 'id', width: 60 },
            {
              title: 'Título',
              dataIndex: 'title',
              ...getColumnSearchProps('title', 'Título'),
            },
            {
              title: 'Estação de Trabalho',
              dataIndex: ['workStation', 'name'],
            },
            {
              title: 'Data de Início',
              dataIndex: 'startDate',
              align: 'center',
              width: 130,
              render(startDate: string) {
    
                return format(new Date(startDate), 'dd/MM/yyyy');
              },
            },
            {
              title: 'Prazo Para Conclusão',
              dataIndex: 'deadline',
              align: 'center',
              width: 130,
              render(deadline: string) {
                return format(new Date(deadline), 'dd/MM/yyyy');
              },
            },
            {
              title: 'Data do Término',
              dataIndex: 'endDate',
              align: 'center',
              width: 130,
              render(endDate: string) {
                return format(new Date(endDate), 'dd/MM/yyyy');
              },
            },

            {
              title: 'Finalização',
              dataIndex: 'completed',
              align: 'center',
              render(_: any, assignment) {
                return (
                  <Checkbox
                    disabled={
                      hasPermission('COMPLETE_ASSIGNMENTS', userAuth) &&
                      !hasEmployeeCurrent(assignment, userAuth)
                    }
                    checked={assignment?.completed}
                    onChange={async () => {
                      await toggleComplete(
                        { completed: !assignment?.completed },
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
              render(_: any, assignment) {
                return (
                  <Checkbox
                    disabled={hasPermission('APPROVE_ASSIGNMENTS', userAuth)}
                    checked={assignment?.approved}
                    onChange={async () => {
                      if (assignment?.approved) {
                        await toggleApprove(
                          { approved: !assignment?.approved },
                          assignment.id,
                        );
                      } else {
                        await toggleApprove(
                          {
                            approved: !assignment?.approved,
                            endDate: new Date().toISOString(),
                          },
                          assignment.id,
                        );
                      }
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
              render: (_: any, assignment) => (
                <Space size={'middle'}>
                  <Tooltip title={'Editar'}>
                    <Button
                      disabled={hasPermission('EDIT_ASSIGNMENTS', userAuth)}
                      type={'link'}
                      icon={<EditOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/editar/${assignment.id}`)
                      }
                    />
                  </Tooltip>

                  <DoubleConfirm
                    deactivatePermission={hasPermission(
                      'EDIT_ASSIGNMENTS',
                      userAuth,
                    )}
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
                      <Button
                        disabled={hasPermission('EDIT_ASSIGNMENTS', userAuth)}
                        type="link"
                      >
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </DoubleConfirm>

                  <Tooltip title={'Atribuir Tarefa'}>
                    <Button
                      disabled={hasPermission('EDIT_ASSIGNMENTS', userAuth)}
                      type={'link'}
                      icon={<ReconciliationOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/${assignment.id}/atribuicao`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title={'Desatribuir Tarefa'}>
                    <Button
                      disabled={hasPermission('EDIT_ASSIGNMENTS', userAuth)}
                      type={'link'}
                      icon={<ReconciliationOutlined />}
                      onClick={() =>
                        navigate(`/tarefa/${assignment.id}/desatribuicao`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title={'Ver Detalhes'}>
                    <Link to={`/tarefas/${assignment.id}/detalhes`}>
                      <Button
                        disabled={hasPermission(
                          'CONSULT_ASSIGNMENTS',
                          userAuth,
                        )}
                        type={'link'}
                        icon={<EyeOutlined />}
                      />
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
