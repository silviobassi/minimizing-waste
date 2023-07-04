import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  WarningFilled,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import confirm from 'antd/es/modal/confirm';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import WrapperDefault from '../components/WrapperDefault';

import { format } from 'date-fns';
import useUserPhoto from '../../core/hooks/useUserPhoto';
import { User } from '../../sdk';
import {
  cpfToFormat,
  phoneToFormat,
} from '../../sdk/utils/generateFormatterData';

export default function EmployeeDetailedView() {
  usePageTitle('Detalhes do Colaborador');
  const { lg, xs } = useBreakpoint();
  const params = useParams<{ employeeId: string }>();

  const { user, fetchUser, removeUser, notFound, entityInUse } = useUser();
  const { userPhoto, fetchUserPhoto } = useUserPhoto();

  useEffect(() => {
    if (!isNaN(Number(params.employeeId))) {
      fetchUser(Number(params.employeeId));
      fetchUserPhoto(Number(params.employeeId));
    }
  }, [fetchUser, fetchUserPhoto, params.employeeId, entityInUse]);

  if (isNaN(Number(params.employeeId)))
    return <Navigate to={'/colaboradores'} />;

  if (notFound) return <Card>usuário não encontrado</Card>;

  if (!user) return <Skeleton />;

  return (
    <WrapperDefault title="Detalhes do Colaborador">
      <Row justify={'start'} gutter={24}>
        <Col xs={24} lg={4}>
          <Row justify={'center'}>
            <Avatar
              size={120}
              src={userPhoto?.avatarUrl}
              icon={<UserOutlined />}
            />
          </Row>
        </Col>
        <Col xs={24} lg={8} style={{ marginBottom: '30px' }}>
          <Space
            style={{ width: '100%' }}
            direction="vertical"
            align={lg ? 'start' : 'center'}
          >
            <Typography.Title level={1}>{user?.name}</Typography.Title>
            <Typography.Text>{user?.email}</Typography.Text>
            <Space>
              <Link to={`/colaborador/editar/${user?.id}`}>
                <Button type="primary" icon={<EditOutlined />}>
                  Editar Perfil
                </Button>
              </Link>
              <Popconfirm
                title={`Remover ${user?.name}`}
                onConfirm={() => {
                  confirm({
                    onOk() {
                      removeUser(user?.id);
                    },
                    icon: <WarningFilled style={{ color: '#1677FF' }} />,
                    title: `Tem certeza que deseja remover o ${user?.name}?`,
                    content:
                      'Excluir um colaborador fará com que ele seja automaticamente desligado da plataforma, podendo causar prejuízos no gerenciamento da(s) obra(s)!',
                  });
                }}
              >
                <Button type="primary" icon={<DeleteOutlined />}>
                  Remover
                </Button>
              </Popconfirm>
            </Space>
          </Space>
        </Col>
        {xs && <Divider />}

        <Col xs={24} lg={12}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'CPF'}>
              {cpfToFormat(user?.cpf)}
            </Descriptions.Item>
            <Descriptions.Item label={'WhatsApp'}>
              {phoneToFormat(user?.whatsApp)}
            </Descriptions.Item>
            <Descriptions.Item label={'Data de Inclusão'}>
              {format(new Date(user?.createdAt), 'dd/MM/yyyy')}
            </Descriptions.Item>
            <Descriptions.Item label={'Cargo'}>
              {user?.office}
            </Descriptions.Item>
            <Descriptions.Item label={'Função'}>
              {user?.occupation}
            </Descriptions.Item>
            <Descriptions.Item label={'Grau de Instrução'}>
              {user?.literate}
            </Descriptions.Item>
            <Descriptions.Item label={'Grupo de Acesso'}>
              {user?.accessGroups.map((group: User.AccessGroupSummary) =>
                group.name === 'Administrador' ? (
                  <Tag color="blue">{group.name.toUpperCase()}</Tag>
                ) : (
                  <Tag color="green">{group.name.toUpperCase()}</Tag>
                ),
              )}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
