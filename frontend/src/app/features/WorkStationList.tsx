import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

interface WorkStationType {
  key: React.Key;
  id: number;
  name: string;
  localization: string;
  sector: string;
}

export default function WorkStationList() {
  const columns: ColumnsType<WorkStationType> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Nome', dataIndex: 'name' },
    { title: 'localização', dataIndex: 'localization' },
    { title: 'Setor', dataIndex: 'sector' },
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

  const workStations: WorkStationType[] = [];

  for (let i = 1; i < 20; i++) {
    workStations.push({
      key: i,
      id: i,
      name: 'Revestimento em Banheiros',
      localization: 'Bloco B17 Apto 123',
      sector: 'Acabamento',
    });
  }

  return (
    <>
      <Table<WorkStationType>
        dataSource={workStations}
        columns={columns}
        pagination={{
          pageSize: 6,
        }}
      />
    </>
  );
}
