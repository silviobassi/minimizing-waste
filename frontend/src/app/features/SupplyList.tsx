import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';

interface SupplyType {
  key: React.Key;
  id: number;
  name: string;
  quantity: number;
  measure: number;
  total: number;
  measureUnitType: string;
}

export default function SupplyList() {
  const navigate = useNavigate();
  const columns: ColumnsType<SupplyType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 60,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      width: 130,
    },
    {
      title: 'Medida',
      dataIndex: 'measure',
      width: 130,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: 130,
    },
    {
      title: 'Unidade',
      dataIndex: 'measureUnitType',
      width: 40,
      align: 'center',
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      align: 'center',
      width: 200,
      render: (_: any, supply) => (
        <Space size={'middle'}>
          <Tooltip title={'Editar'}>
            <Button
              type={'link'}
              icon={<EditOutlined />}
              onClick={(_) => navigate(`/recurso/editar/${supply.id}`)}
            />
          </Tooltip>
          <Tooltip title={'Excluir'}>
            <Button type={'link'} icon={<DeleteOutlined />} />
          </Tooltip>
         
          <Tooltip title={'Ver Detalhes'}>
            <Button type={'link'} icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const supplies: SupplyType[] = [];

  for (let i = 1; i < 20; i++) {
    supplies.push({
      key: i,
      id: i,
      name: i % 2 === 0 ? 'Cimento Itaú' : 'Porcelanato Retificado Porto Bello',
      quantity: i * 3,
      measure: i * 7,
      total: i * 3 * 7,
      measureUnitType: i % 2 === 0 ? 'KG' : 'M²',
    });
  }

  return (
    <WrapperDefault title="Lista de Recursos">
      <Table<SupplyType>
        dataSource={supplies}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
