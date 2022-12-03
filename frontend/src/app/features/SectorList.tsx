import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
interface SectorType {
  key: React.Key;
  id: number;
  name: string;
}

export default function SectorList() {
  const columns: ColumnsType<SectorType> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Nome', dataIndex: 'name' },
    {
      title: 'Ações',
      dataIndex: 'actions',
      align: 'center',
      width: 200,
      render: (_: any, workstation) => (
        <Space size={'middle'}>
          <Tooltip title={'Editar'}>
            <Button type={'primary'} shape={'circle'} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title={'Excluir'}>
            <Button
              type={'primary'}
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
    <>
      <Table<SectorType>
        dataSource={sectors}
        columns={columns}
        pagination={{
          pageSize: 6,
        }}
      />
    </>
  );
}
