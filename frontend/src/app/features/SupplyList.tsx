import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Supply } from '../../@types/Supply';
import SupplyService from '../../services/Supply.service';
import WrapperDefault from '../components/WrapperDefault';

export default function SupplyList() {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState<Supply.Summary[]>([]);

  useEffect(() => {
    SupplyService.getAllSupplies().then(setSupplies);
  }, []);

  const columns: ColumnsType<Supply.Summary> = [
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
      dataIndex: ['supplyDescription', 'quantity'],

      width: 130,
    },

    {
      title: 'Medida',
      dataIndex: ['supplyDescription', 'measure'],
      width: 130,
    },
    {
      title: 'Total',
      dataIndex: ['supplyDescription', 'total'],
      width: 130,
    },
    {
      title: 'Unidade',
      dataIndex: ['supplyDescription', 'measureUnitType'],
      width: 40,
      align: 'center',
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      align: 'center',
      width: 200,
      render: (_: any, supply: Supply.Summary) => (
        <Space size={'middle'}>
          <Tooltip title={'Editar'}>
            <Button
              type={'link'}
              icon={<EditOutlined />}
              onClick={(_) => navigate(`/recursos/editar/${supply.id}`)}
            />
          </Tooltip>
          <Tooltip title={'Excluir'}>
            <Button type={'link'} icon={<DeleteOutlined />} />
          </Tooltip>

          <Tooltip title={'Ver Detalhes'}>
            <Button
              type={'link'}
              icon={<EyeOutlined />}
              onClick={() => navigate(`/recursos/${supply.id}/detalhes`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <WrapperDefault title="Lista de Recursos">
      <Table<Supply.Summary>
        dataSource={supplies}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
