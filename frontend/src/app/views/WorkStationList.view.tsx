import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import WorkStationList from '../features/WorkStationList';

interface WorkStationType {
  key: React.Key;
  id: number;
  name: string;
  localization: string;
  sector: string;
}

const columns: ColumnsType<WorkStationType> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Nome', dataIndex: 'name' },
  { title: 'localização', dataIndex: 'localization' },
  { title: 'Setor', dataIndex: 'sector' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    render: (_: any, workstation) => (
      <Space size={'middle'}>
        <Tooltip title={'Editar'}>
          <Button type={'primary'} shape={'circle'} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title={'Excluir'}>
          <Button type={'primary'} shape={'circle'} icon={<DeleteOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

const data: WorkStationType[] = [];

for (let i = 1; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    name: 'Revestimento em Banheiros',
    localization: 'Bloco B17 Apto 123',
    sector: 'Acabamento',
  });
}
export default function WorkStationListView() {
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button type={'primary'} size={'large'}>
            CRIAR ESTAÇÃO DE TRABALHO
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <WorkStationList />
        </Col>
      </Row>
    </>
  );
}
