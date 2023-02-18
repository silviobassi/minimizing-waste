import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Table from 'antd/es/table';
import { Supply } from '../../@types/Supply';
import WrapperDefault from '../components/WrapperDefault';

import { useEffect } from 'react';

import useSupplies from '../../core/hooks/useSupplies';


export default function SupplyList() {

  const { supplies, fetchSupplies } = useSupplies();

  useEffect(() => {
    fetchSupplies();
  }, [fetchSupplies]);

  return (

    <WrapperDefault title="Lista de Recursos">
      <Table<Supply.PagedModelSummary>
        rowKey="id"
        dataSource={supplies?._embedded?.supplies}
        columns={[
          {
            title: 'ID',
            dataIndex: ['id'],
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
            dataIndex: '_links',
            align: 'center',
            width: 200,
            render: (_: string, _links: string) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button type={'link'} icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip title={'Excluir'}>
                  <Button
                    type={'link'}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>

                <Tooltip title={'Ver Detalhes'}>
                  <Button type={'link'} icon={<EyeOutlined />} />
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
