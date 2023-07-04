import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Table from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWorkStations from '../../core/hooks/useWorkStations';
import { WorkStation } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function WorkStationList() {
  const navigate = useNavigate();
  const { workStations, fetchWorkStations, accessDeniedError } =
    useWorkStations();

  useEffect(() => {
    fetchWorkStations();
  }, [fetchWorkStations]);

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
                <Tooltip title={'Excluir'}>
                  <Button
                    type={'link'}
                    shape={'circle'}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
