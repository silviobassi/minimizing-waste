import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import useSector from '../../core/hooks/useSector';
import useSectors from '../../core/hooks/useSectors';
import { Sector } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';
export default function SectorList() {
  const navigate = useNavigate();
  const { sectors, fetchSectors } = useSectors();
  const { userAuth } = useAuth();

  const { removeSector } = useSector();

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    fetchSectors().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchSectors]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return (
    <WrapperDefault title="Edição de Setor">
      <Table<Sector.Collection>
        rowKey="id"
        dataSource={sectors?._embedded?.sectors}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Nome', dataIndex: 'name' },
          {
            title: 'Ações',
            dataIndex: 'actions',
            align: 'center',
            width: 200,
            render: (_: any, sector) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button
                    disabled={!hasPermission('EDIT_SECTORS', userAuth)}
                    type={'link'}
                    shape={'circle'}
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/setor/editar/${sector.id}`)}
                  />
                </Tooltip>

                <DoubleConfirm
                  deactivatePermission={
                    !hasPermission('EDIT_SECTORS', userAuth)
                  }
                  popConfirmTitle="Remover Setor?"
                  popConfirmContent="Deseja mesmo remover este Setor?"
                  onConfirm={async () => {
                    await removeSector(Number(sector.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Setor ${sector.name}  removido com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button
                      disabled={!hasPermission('EDIT_SECTORS', userAuth)}
                      type="link"
                    >
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
