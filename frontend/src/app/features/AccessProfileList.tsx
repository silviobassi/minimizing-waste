import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAccessProfiles from '../../core/hooks/useAccessProfiles';
import useAuth from '../../core/hooks/useAuth';
import { Role } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

import useAccessProfile from '../../core/hooks/useAccessProfile';

export default function AccessProfileList() {
  const navigate = useNavigate();
  const { fetching, roles, fetchRoles } = useAccessProfiles();
  const { userAuth } = useAuth();

  const { removeRole } = useAccessProfile();

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    fetchRoles().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchRoles]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return (
    <WrapperDefault title="Edição de Perfis de Acesso">
      <Table<Role.CollectionDetailed>
        loading={fetching}
        rowKey="id"
        dataSource={roles?._embedded?.roles}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Nome', dataIndex: 'name' },
          {
            title: 'Ações',
            dataIndex: 'actions',
            align: 'center',
            width: 200,
            render: (_: any, role: Role.Detailed) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Link to={`/perfil-de-acesso/editar/${role.id}`}>
                    <Button
                      type={'link'}
                      shape={'circle'}
                      icon={<EditOutlined />}
                    />
                  </Link>
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Perfil de Acesso?"
                  popConfirmContent="Deseja mesmo remover este Perfil?"
                  onConfirm={async () => {
                    await removeRole(Number(role.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Perfil de Acesso ${role.name} removido com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button type="link">
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
    </WrapperDefault>
  );
}
