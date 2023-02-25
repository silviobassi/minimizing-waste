import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Descriptions, Space, Tooltip } from 'antd';
import Table from 'antd/es/table';
import { Supply } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';

import { useEffect, useState } from 'react';

import useSupplies from '../../core/hooks/useSupplies';

export default function SupplyList() {
  const { supplies, fetchSupplies } = useSupplies();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchSupplies(page);
  }, [fetchSupplies, page]);

  return (
    <WrapperDefault title="Lista de Recursos">
      <Table<Supply.PagedModelSummary>
        rowKey="id"
        dataSource={supplies?._embedded?.supplies}
        columns={[
          {
            title: 'Colaboradores',
            responsive: ['xs'],
            render(supply: Supply.SummaryModel) {
              return (
                <Descriptions column={1} size={'small'}>
                  <Descriptions.Item label={'Nome'}>
                    {supply.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Quantidade'}>
                    {supply.supplyDescription.quantity}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Medida'}>
                    {`${supply.supplyDescription.measure} ${supply.supplyDescription.measureUnitType}`}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Total'}>
                    {`${supply.supplyDescription.total} ${supply.supplyDescription.measureUnitType}`}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ações'}>
                    <Space size={'middle'}>
                      <Tooltip title={'Editar'}>
                        <Button type={'link'} icon={<EditOutlined />} />
                      </Tooltip>
                      <Tooltip title={'Excluir'}>
                        <Button type={'link'} icon={<DeleteOutlined />} />
                      </Tooltip>

                      <Tooltip title={'Ver Detalhes'}>
                        <Button type={'link'} icon={<EyeOutlined />} />
                      </Tooltip>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              );
            },
          },
          {
            title: 'ID',
            dataIndex: ['id'],
            align: 'center',
            width: 60,
            responsive: ['sm'],
          },
          {
            title: 'Nome',
            dataIndex: 'name',
            fixed: 'left',
            responsive: ['sm'],
          },
          {
            title: 'Quantidade',
            dataIndex: ['supplyDescription', 'quantity'],
            width: 130,
            responsive: ['sm'],
          },

          {
            title: 'Medida',
            dataIndex: ['supplyDescription', 'measure'],
            width: 130,
            responsive: ['sm'],
          },
          {
            title: 'Total',
            dataIndex: ['supplyDescription', 'total'],
            width: 130,
            responsive: ['sm'],
          },
          {
            title: 'Unidade',
            dataIndex: ['supplyDescription', 'measureUnitType'],
            width: 40,
            align: 'center',
            responsive: ['sm'],
          },
          {
            title: 'Ações',
            dataIndex: '_links',
            align: 'center',
            width: 200,
            responsive: ['sm'],
            render: (_: string, _links: string) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button type={'link'} icon={<EditOutlined />} />
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
        ]}
        pagination={{
          onChange: (page: number) => setPage(page - 1),
          total: supplies?.page?.totalElements,
          pageSize: 4,
        }}
      />
    </WrapperDefault>
  );
}
