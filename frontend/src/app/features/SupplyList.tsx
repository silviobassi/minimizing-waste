import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  Input,
  Space,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import Table, { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Supply } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

import { Link } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import useSupplies from '../../core/hooks/useSupplies';
import useSupply from '../../core/hooks/useSupply';
import DoubleConfirm from '../components/DoubleConfirm';

export default function SupplyList() {
  const { supplies, fetchSupplies, fetching } = useSupplies();
  const { removeSupply } = useSupply();
  const [page, setPage] = useState<number>(0);
  const { userAuth } = useAuth();

  const [supplyName, setSupplyName] = useState<string>();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    fetchSupplies({ page: page, size: 4, sort: ['asc'], supplyName }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchSupplies, page, supplyName]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const getColumnSearchProps = (
    dataIndex: keyof Supply.PagedModelSummary,
    displayName?: string,
  ): ColumnProps<Supply.PagedModelSummary> => ({
    filterDropdown: ({}) => (
      <Card>
        <Input
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSupplyName(e.target.value);
          }}
        />
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  return (
    <WrapperDefault title="Lista de Recursos">
      <Table<Supply.PagedModelSummary>
        loading={fetching}
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
            ...getColumnSearchProps('name', 'Nome'),
          },
          {
            title: 'Embalagem',
            dataIndex: ['supplyDescription', 'packing'],
            fixed: 'left',
            responsive: ['sm'],
          },
          {
            title: 'Quantidade',
            dataIndex: ['supplyDescription', 'quantity'],
            fixed: 'left',
            responsive: ['sm'],
            render(_: any, supply) {
              return (
                <>
                  <Space>{supply.supplyDescription?.quantity}</Space>
                </>
              );
            },
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
                  <Link to={`/recursos/${supply.id}/detalhes`}>
                    {' '}
                    <Button type={'link'} icon={<EyeOutlined />} />
                  </Link>
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
