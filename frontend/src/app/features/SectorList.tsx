import { DeleteOutlined, EditOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import useSectors from '../../core/hooks/useSectors'
import { Sector } from '../../@types/Sector';
import WrapperDefault from '../components/WrapperDefault';
import { useEffect } from 'react';
export default function SectorList() {
  const navigate = useNavigate();
  const {sectors, fetchSectors} = useSectors()

  useEffect(() => {
    fetchSectors()
  }, [fetchSectors])

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
                <Tooltip title={'Excluir'}>
                  <Button
                     type={'link'}
                    shape={'circle'}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
                <Tooltip title={'Alocar Recursos'}>
                  <Button
                    type={'link'}
                    icon={<ReconciliationOutlined />}
                    onClick={() => navigate(`/setor/${sector.id}/alocacao/recurso`)}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
    </WrapperDefault>
  );
}
