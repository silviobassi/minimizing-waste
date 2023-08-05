import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Space,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Supply } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

import { Link } from 'react-router-dom';
import useSupplies from '../../core/hooks/useSupplies';
import useSupply from '../../core/hooks/useSupply';
import DoubleConfirm from '../components/DoubleConfirm';

export default function SupplyList() {
  const { supplies, fetchSupplies, accessDeniedError } = useSupplies();
  const { removeSupply } = useSupply();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchSupplies(page);
  }, [fetchSupplies, page]);

  if (accessDeniedError) return <AccessDenied />;

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
                  <Descriptions.Item label={'Embalagem'}>
                    {supply.supplyDescription.packing}
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
            title: 'Embalagem',
            dataIndex: ['supplyDescription', 'packing'],
            fixed: 'left',
            responsive: ['sm'],
          },
          {
            title: 'Medida Unitária',
            dataIndex: ['supplyDescription', 'measure'],
            width: 200,
            responsive: ['sm'],
            render(_: any, supply) {
              return (
                <>
                  <Space>
                    {supply.supplyDescription?.measure}
                    <Typography.Text underline>
                      {supply.supplyDescription?.measureUnitType}
                    </Typography.Text>
                  </Space>
                </>
              );
            },
          },
          {
            title: 'Total',
            dataIndex: ['supplyDescription', 'total'],
            width: 200,
            responsive: ['sm'],
            render(_: any, supply) {
              return (
                <>
                  <Space>
                    {supply.supplyDescription?.total}
                    <Typography.Text underline>
                      {supply.supplyDescription?.measureUnitType}
                    </Typography.Text>
                  </Space>
                </>
              );
            },
          },
          {
            title: 'Ações',
            dataIndex: 'id',
            align: 'center',
            width: 200,
            responsive: ['sm'],
            render: (_: any, supply) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Link to={`/recursos/editar/${supply.id}`}>
                    <Button type={'link'} icon={<EditOutlined />} />
                  </Link>
                </Tooltip>
                <DoubleConfirm
                  popConfirmTitle="Remover Recurso?"
                  popConfirmContent="Deseja mesmo remover este recurso?"
                  onConfirm={async () => {
                    await removeSupply(Number(supply.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Recurso ${supply.name}  removido com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button type="link">
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>

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
