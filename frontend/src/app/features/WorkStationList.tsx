import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, notification } from 'antd';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import useWorkStation from '../../core/hooks/useWorkStation';
import useWorkStations from '../../core/hooks/useWorkStations';
import { WorkStation } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function WorkStationList() {
  const navigate = useNavigate();
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { workStations, fetchWorkStations } = useWorkStations();
  const { userAuth } = useAuth();

  const { removeWorkStation } = useWorkStation();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchWorkStations(page, 4).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchWorkStations, page]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

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
                    disabled={!hasPermission('EDIT_WORK_STATIONS', userAuth)}
                    type={'link'}
                    shape={'circle'}
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(`/estacao-de-trabalho/editar/${workstation.id}`)
                    }
                  />
                </Tooltip>

                <DoubleConfirm
                 deactivatePermission={
                  !hasPermission('EDIT_WORK_STATIONS', userAuth)
                }
                  popConfirmTitle="Remover Estação de Trabalho?"
                  popConfirmContent="Deseja mesmo remover esta estação de trabalho?"
                  onConfirm={async () => {
                    await removeWorkStation(Number(workstation.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Estação de trabalho ${workstation.name}  removida com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button disabled={!hasPermission('EDIT_WORK_STATIONS', userAuth)} type="link">
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
