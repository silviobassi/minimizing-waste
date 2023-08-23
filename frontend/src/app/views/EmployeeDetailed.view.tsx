import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import WrapperDefault from '../components/WrapperDefault';

import { format } from 'date-fns';
import { User } from '../../sdk';
import {
  cpfToFormat,
  phoneToFormat,
} from '../../sdk/utils/generateFormatterData';
import DoubleConfirm from '../components/DoubleConfirm';
import ElementNotFound from '../components/ElementNotFound';
import AccessDenied from '../components/AccessDenied';

export default function EmployeeDetailedView() {
  usePageTitle('Detalhes do Colaborador');
  const { lg, xs } = useBreakpoint();
  const params = useParams<{ employeeId: string }>();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  const { user, fetchUser, removeUser, notFound } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.employeeId))) {
      fetchUser(Number(params.employeeId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
    }
  }, [fetchUser, params.employeeId]);

  if (isNaN(Number(params.employeeId)))
    return <Navigate to={'/colaboradores'} />;

  if (notFound)
    return <ElementNotFound description="Colaborador não encontrado" />;
  if (accessDeniedError) return <AccessDenied />;
  if (!user) return <Skeleton />;

  return (
    <WrapperDefault title="Detalhes do Colaborador">
      <Row justify={'space-around'} gutter={30}>
        <Col xs={24} lg={3}>
          <Avatar size={128} src={user?.avatarUrl}></Avatar>
        </Col>
        <Col xs={24} lg={11} style={{ marginBottom: '30px' }}>
          <Space
            style={{ width: '100%' }}
            direction="vertical"
            align={lg ? 'start' : 'center'}
          >
            <Typography.Title level={3}>{user?.name}</Typography.Title>
            <Typography.Text>{user?.email}</Typography.Text>
            <Space>
              <Link to={`/colaborador/editar/${user?.id}`}>
                <Button type="primary" icon={<EditOutlined />}>
                  Editar Perfil
                </Button>
              </Link>
              <DoubleConfirm
                popConfirmTitle="Remover Colaborador?"
                popConfirmContent="Deseja mesmo remover este colaborador?"
                onConfirm={async () => {
                  await removeUser(Number(user.id));
                  notification.success({
                    message: 'Sucesso',
                    description: `Tarefa ${user.name}  removida com sucesso`,
                  });
                }}
              >
                <Tooltip title={'Excluir'} placement="bottom">
                  <Button type="primary" danger>
                    <DeleteOutlined />
                    Remover
                  </Button>
                </Tooltip>
              </DoubleConfirm>
            </Space>
          </Space>
        </Col>
        {xs && <Divider />}

        <Col xs={24} lg={8}>
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
            <Descriptions.Item label={'Nível de Acesso'}>
            <Tag color="blue">{user?.role?.name.toUpperCase()}</Tag>
              
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
