import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, notification } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSector from '../../core/hooks/useSector';
import useSectors from '../../core/hooks/useSectors';
import { Sector } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';
export default function SectorList() {
  const navigate = useNavigate();
  const { sectors, fetchSectors, accessDeniedError } = useSectors();

  const { removeSector } = useSector();

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  if (accessDeniedError) return <AccessDenied />;

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
                    type={'link'}
                    shape={'circle'}
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/setor/editar/${sector.id}`)}
                  />
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Setor?"
                  popConfirmContent="Deseja mesmo remover esta tarefa?"
                  onConfirm={async () => {
                    try {
                      await removeSector(Number(sector.id)).then((res) => {
                        if (res === 204) {
                          notification.success({
                            message: 'Sucesso',
                            description: `Setor ${sector.name}  removido com sucesso`,
                          });
                        }
                      });
                      fetchSectors();
                    } catch (error: any) {
                      notification.error({
                        message: `Houve um erro: ${error.message}`,
                      });
                    }
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
