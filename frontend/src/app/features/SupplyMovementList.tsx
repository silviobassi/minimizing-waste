import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Space, Table, Tooltip, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSupplyMovement from '../../core/hooks/useSuppliesMovement';
import useSuppliesMovements from '../../core/hooks/useSuppliesMovements';
import { Supply } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function SupplyMovementList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);

  const { suppliesMovements, fetchSuppliesMovements, accessDeniedError } =
    useSuppliesMovements();

  const { removeSupplyMovement } = useSupplyMovement();

  useEffect(() => {
    fetchSuppliesMovements(page);
  }, [fetchSuppliesMovements, page]);

  if (accessDeniedError) return <AccessDenied />;

  return (
    <WrapperDefault title="Lista de Movimento de Recursos">
      <Table<Supply.PagedModelSupplyMovementModel>
        dataSource={suppliesMovements?._embedded?.suppliesMovements}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          {
            title: 'Nome do Recurso',
            dataIndex: ['supply', 'name'],
            width: 300,
          },
          {
            title: 'Estação de Trabalho',
            dataIndex: ['workStation', 'name'],
            width: 300,
          },
          {
            title: 'Setor',
            dataIndex: ['workStation', 'sector', 'name'],
            width: 300,
          },
          { title: 'QTD Alocada', dataIndex: 'allocatedQuantity', width: 120 },
          {
            title: 'Desocupado?',
            dataIndex: 'notBusy',
            align: 'center',
            render(notBusy: boolean) {
              return <Checkbox checked={notBusy}>DESOCUPADO</Checkbox>;
            },
          },
          {
            title: 'Movimentável?',
            dataIndex: 'movable',
            align: 'center',
            render(movable: boolean) {
              return <Checkbox checked={movable}>MOVIMENTÁVEL</Checkbox>;
            },
          },
          {
            title: 'Ações',
            dataIndex: 'id',
            width: 200,
            render: (_: any, supplyMovement) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button
                    type={'link'}
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(
                        `/movimento-recursos/editar/${supplyMovement?.id}`,
                      )
                    }
                  />
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Recurso?"
                  popConfirmContent="Deseja mesmo remover este movimento?"
                  onConfirm={async () => {
                    await removeSupplyMovement(Number(supplyMovement?.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Movimento  removido com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button type="link">
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>
                <Tooltip title={'Devolver'}>
                  <Button
                    type={'link'}
                    icon={<RollbackOutlined />}
                    onClick={() =>
                      navigate(`/movimento-recursos/devolver-recurso/${id}`)
                    }
                  />
                </Tooltip>
                <Tooltip title={'Disponibilizar'}>
                  <Button type={'link'} icon={<CheckCircleOutlined />} />
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
          total: suppliesMovements?.page?.totalElements,
          pageSize: 4,
        }}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
