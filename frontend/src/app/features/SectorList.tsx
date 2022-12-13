import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';
interface SectorType {
  key: React.Key;
  id: number;
  name: string;
}

export default function SectorList() {
  const navigate = useNavigate();

  const columns: ColumnsType<SectorType> = [
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
        </Space>
      ),
    },
  ];

  const sectors: SectorType[] = [];

  for (let i = 1; i < 20; i++) {
    sectors.push({
      key: i,
      id: i,
      name: `Alvenaria #${i}`,
    });
  }

  return (
    <WrapperDefault title="Edição de Setor">
      <Table<SectorType>
        dataSource={sectors}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
