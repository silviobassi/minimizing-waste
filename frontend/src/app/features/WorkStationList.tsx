import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, notification } from 'antd';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWorkStation from '../../core/hooks/useWorkStation';
import useWorkStations from '../../core/hooks/useWorkStations';
import { WorkStation } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function WorkStationList() {
  const navigate = useNavigate();
  const { workStations, fetchWorkStations, accessDeniedError } =
    useWorkStations();

  const { removeWorkStation } = useWorkStation();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchWorkStations(page);
  }, [fetchWorkStations, page]);

  if (accessDeniedError) return <AccessDenied />;

  return (
    <WrapperDefault title="Lista de Estações de Trabalho">
      <Table<WorkStation.Collection>
        rowKey="id"
        dataSource={workStations?._embedded?.workStations}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Nome', dataIndex: 'name' },
          { title: 'localização', dataIndex: 'localization' },
          { title: 'Setor', dataIndex: ['sector', 'name'] },
          {
            title: 'Ações',
            dataIndex: 'actions',
            align: 'center',
            width: 200,
            render: (_: any, workstation) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button
                    type={'link'}
                    shape={'circle'}
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(`/estacao-de-trabalho/editar/${workstation.id}`)
                    }
                  />
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Estação de Trabalho?"
                  popConfirmContent="Deseja mesmo remover esta estação de trabalho?"
                  onConfirm={async () => {
                    try {
                      await removeWorkStation(Number(workstation.id)).then(
                        (res) => {
                          if (res.meta?.requestStatus === 'fulfilled') {
                            notification.success({
                              message: 'Sucesso',
                              description: `Estação de Trabalho ${workstation.name}  removida com sucesso`,
                            });
                          }
                        },
                      );
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
        pagination={{
          onChange: (page: number) => setPage(page - 1),
          total: workStations?.page?.totalElements,
          pageSize: 4,
        }}
      />
    </WrapperDefault>
  );
}
