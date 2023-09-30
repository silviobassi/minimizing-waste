import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  KeyOutlined,
  LockOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import useUser from '../../core/hooks/useUser';
import useUsers from '../../core/hooks/useUsers';
import { User } from '../../sdk/@types';
import {
  cpfToFormat,
  phoneToFormat,
} from '../../sdk/utils/generateFormatterData';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import ReloadList from '../components/ReloadList';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeList() {
  const { users, fetchUsers, fetching } = useUsers();
  const [page, setPage] = useState<number>(0);
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { removeUser } = useUser();
  const { userAuth } = useAuth();
  const [userCpf, setUserCpf] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const { xs } = useBreakpoint();

  useEffect(() => {
    fetchUsers({
      page,
      size: 4,
      sort: ['name', 'asc'],
      userCpf,
      userName,
    }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchUsers, page, userCpf, userName]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const getColumnSearchNameProps = (
    dataIndex: keyof User.PagedModelDetailed,
    displayName?: string,
  ): ColumnProps<User.PagedModelDetailed> => ({
    filterDropdown: ({}) => (
      <Card style={{ backgroundColor: '#D0E3F5' }}>
        <Input
          style={{ backgroundColor: '#E8EEF5' }}
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  const getColumnSearchCpfProps = (
    dataIndex: keyof User.PagedModelDetailed,
    displayName?: string,
  ): ColumnProps<User.PagedModelDetailed> => ({
    filterDropdown: ({}) => (
      <Card style={{ backgroundColor: '#D0E3F5' }}>
        <Input
          style={{ backgroundColor: '#E8EEF5' }}
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setUserCpf(e.target.value);
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
      <Space
        style={{ width: '100%' }}
        direction={xs ? 'vertical' : 'horizontal'}
        size={'middle'}
      >
        <ReloadList onReload={fetchUsers} />
        <Button
          style={xs ? { width: '100%' } : { display: 'flex' }}
          type={'primary'}
          size={'large'}
          onClick={() => navigate('/colaborador/criar')}
        >
          CRIAR COLABORADORES
        </Button>
      </Space>

      <Divider />
      <WrapperDefault title="Lista de Colaboradores">
        {xs && (
          <>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Buscar por Nome"
              type="text"
              style={{ width: '100%', marginBottom: 10, marginTop: 20 }}
            />
            <Input
              onChange={(e) => setUserCpf(e.target.value)}
              placeholder="Buscar por CPF"
              type="text"
              style={{ width: '100%', marginBottom: 30, marginTop: 20 }}
            />
          </>
        )}
        <Table<User.PagedModelDetailed>
          loading={fetching}
          //@ts-ignore
          dataSource={users?._embedded?.users}
          rowKey="id"
          columns={[
            {
              title: 'Colaboradores',
              responsive: ['xs'],
              render(user: User.PagedModelDetailed) {
                return (
                  <Space direction="vertical">
                    <Descriptions column={1} size={'small'}>
                      <Row justify={'space-between'}>
                        <Col xs={5} style={{ marginRight: 10 }}>
                          {' '}
                          <Descriptions.Item>
                            <Avatar
                              size={45}
                              src={user?.avatarUrl}
                              icon={<UserOutlined />}
                            />
                          </Descriptions.Item>
                        </Col>
                        <Col xs={19}>
                          {' '}
                          <Descriptions.Item>{user?.name}</Descriptions.Item>
                        </Col>
                      </Row>
                      <Descriptions.Item label="CPF:">
                        {cpfToFormat(user?.cpf)}
                      </Descriptions.Item>
                      <Descriptions.Item label="WhatsApp:">
                        {phoneToFormat(user?.whatsApp)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Cadastrado em:">
                        {moment(user?.createdAt).format('DD/MM/YYYY HH:ss')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Nível de Acesso:">
                        {user?.role ? (
                          <Tag color="blue">
                            {user?.role?.name.toUpperCase()}
                          </Tag>
                        ) : (
                          <Tag color="red">
                            SEM ACESSO
                          </Tag>
                        )}
                      </Descriptions.Item>

                      <Descriptions.Item label={'Ações'}>
                        <>
                          <Tooltip title={'Editar'}>
                            <Link to={`/colaborador/editar/${user.id}`}>
                              <Button type={'link'} icon={<EditOutlined />} />
                            </Link>
                          </Tooltip>

                          <DoubleConfirm
                            popConfirmTitle="Remover Colaborador?"
                            popConfirmContent="Deseja mesmo remover este colaborador?"
                            onConfirm={async () => {
                              console.log(user.id);
                              await removeUser(Number(user.id));
                              notification.success({
                                message: 'Sucesso',
                                description: `Tarefa ${user.name}  removida com sucesso`,
                              });
                            }}
                          >
                            <Tooltip title={'Excluir'} placement="bottom">
                              <Button type="link">
                                <DeleteOutlined />
                              </Button>
                            </Tooltip>
                          </DoubleConfirm>

                          <Tooltip title={'Ver Detalhes'}>
                            <Link to={`/colaborador/${user.id}/detalhes`}>
                              <Button type={'link'} icon={<EyeOutlined />} />
                            </Link>
                          </Tooltip>
                        </>
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                );
              },
            },
            { title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'] },
            {
              title: 'Avatar',
              dataIndex: 'avatarUrl',
              width: 60,
              responsive: ['sm'],

              render(avatarUrl: string) {
                return (
                  <Avatar src={avatarUrl}>
                    <UserOutlined />
                  </Avatar>
                );
              },
            },
            {
              title: 'Nome',
              dataIndex: 'name',
              width: 450,
              responsive: ['sm'],
              ...getColumnSearchNameProps('name', 'Nome'),
            },
            {
              title: 'CPF',
              dataIndex: 'cpf',
              width: 150,
              responsive: ['sm'],
              ...getColumnSearchCpfProps('cpf', 'CPF'),
              render(cpf: string) {
                return cpfToFormat(cpf);
              },
            },
            {
              title: 'WhatsApp',
              dataIndex: 'whatsApp',
              width: 270,
              responsive: ['sm'],
              render(whatsApp: string) {
                return phoneToFormat(whatsApp);
              },
            },
            {
              title: 'Data da Criação',
              dataIndex: 'createdAt',
              width: 270,
              responsive: ['sm'],
              render(createdAt: string) {
                return format(new Date(createdAt), 'dd/MM/yyyy - HH:ss');
              },
            },
            {
              title: 'Nível de Acesso',
              dataIndex: 'role',
              width: 180,
              responsive: ['sm'],
              render(_: any, user: User.Detailed) {
                return (
                  <>
                    {user?.role?.name ? (
                      <Tag color="blue">
                        {user?.role?.name.toUpperCase()}
                      </Tag>
                    ) : (
                      <Tag color="red">
                        AUTENTICADO
                      </Tag>
                    )}
                  </>
                );
              },
            },
            {
              title: 'Ações',
              dataIndex: 'id',
              align: 'center',
              width: 300,
              responsive: ['sm'],
              render: (_: any, user) => (
                <>
                  <Tooltip title={'Editar'}>
                    <Link to={`/colaborador/editar/${user.id}`}>
                      <Button type={'link'} icon={<EditOutlined />} />
                    </Link>
                  </Tooltip>

                  <DoubleConfirm
                    popConfirmTitle="Remover Colaborador?"
                    popConfirmContent="Deseja mesmo remover este colaborador?"
                    onConfirm={async () => {
                      console.log(user.id);
                      await removeUser(Number(user.id));
                      notification.success({
                        message: 'Sucesso',
                        description: `Tarefa ${user.name}  removida com sucesso`,
                      });
                    }}
                  >
                    <Tooltip title={'Excluir'} placement="bottom">
                      <Button type="link">
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </DoubleConfirm>

                  <Tooltip title={'Ver Detalhes'}>
                    <Link to={`/colaborador/${user.id}/detalhes`}>
                      <Button type={'link'} icon={<EyeOutlined />} />
                    </Link>
                  </Tooltip>
                </>
              ),
            },
          ]}
          pagination={{
            onChange: (page: number) => setPage(page - 1),
            //@ts-ignore
            total: users?.page?.totalElements,
            pageSize: 4,
          }}
        />
      </WrapperDefault>
    </>
  );
}
