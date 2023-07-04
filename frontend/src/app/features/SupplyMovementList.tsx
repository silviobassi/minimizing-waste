import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Space, Table, Tooltip } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSuppliesMovements from '../../core/hooks/useSuppliesMovements';
import { Supply } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function SupplyMovementList() {
  const navigate = useNavigate();

  const { suppliesMovements, fetchSuppliesMovements, accessDeniedError } =
    useSuppliesMovements();
  useEffect(() => {
    fetchSuppliesMovements();
  }, [fetchSuppliesMovements]);

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
            render: (id: number) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button
                    type={'link'}
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/movimento-recursos/editar/${id}`)}
                  />
                </Tooltip>
                <Tooltip title={'Excluir'}>
                  <Button
                    type={'link'}
                    icon={<DeleteOutlined />}
                    onClick={() => navigate('/#')}
                  />
                </Tooltip>
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
          pageSize: 5,
        }}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
