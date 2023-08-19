import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSupplyMovement from '../../core/hooks/useSuppliesMovement';
import useSuppliesMovements from '../../core/hooks/useSuppliesMovements';
import { Supply } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function SupplyMovementList() {
  const navigate = useNavigate();

  const [form] = Form.useForm<Supply.MovementInput>();

  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [movement, setMovement] = useState<{
    id: number;
    supplyName: string;
  }>();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const { suppliesMovements, fetchSuppliesMovements } =
    useSuppliesMovements();

  const {
    removeSupplyMovement,
    vacateSupplyMovement,
    giveBackSupplyMovement,
    endSupply,
  } = useSupplyMovement();

  useEffect(() => {
    fetchSuppliesMovements(page).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
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
          {
            title: 'QTD Disponível',
            dataIndex: ['supply', 'supplyDescription', 'quantity'],
            width: 120,
          },
          { title: 'QTD Alocada', dataIndex: 'allocatedQuantity', width: 120 },
          {
            title: 'Desocupado?',
            dataIndex: 'notBusy',
            align: 'center',
            render(_: any, movement: Supply.MaterialModel) {
              return (
                <>
                  {' '}
                  <Checkbox
                    onChange={async () => {
                      await vacateSupplyMovement(movement?.id);
                    }}
                    checked={movement?.notBusy}
                  >
                    {movement?.notBusy ? (
                      <Tag color="blue">DESOCUPADO</Tag>
                    ) : (
                      <Tag color="red">OCUPADO</Tag>
                    )}
                  </Checkbox>
                </>
              );
            },
          },
          {
            title: 'Movimentável?',
            dataIndex: 'movable',
            align: 'center',
            render(movable: boolean) {
              return (
                <>
                  {movable ? (
                    <Tag color="blue">MOVIMENTÁVEL</Tag>
                  ) : (
                    <Tag color="red">IMOVIMENTÁVEL</Tag>
                  )}
                </>
              );
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
                  popConfirmTitle="Remover Movimento?"
                  popConfirmContent="Deseja mesmo remover este movimento?"
                  onConfirm={async () => {
                    await removeSupplyMovement(Number(supplyMovement?.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Movimento do recurso ${supplyMovement?.supply?.name}  removido com sucesso`,
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
                    onClick={() => {
                      setMovement({
                        ...movement,
                        id: supplyMovement?.id,
                        supplyName: supplyMovement?.supply?.name,
                      });
                      setOpen(true);
                    }}
                    icon={<RollbackOutlined />}
                  />
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Utilizou o recurso alocado?"
                  popConfirmContent="Tem certeza que o recurso alocado foi utilizado?"
                  onConfirm={async () => {
                    await endSupply(Number(supplyMovement?.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Quantidade do recurso: ${supplyMovement?.supply?.name} utilizada, deduzida com sucesso`,
                    });
                  }}
                >
                  <Tooltip
                    title={'Recurso Alocado Utilizado'}
                    placement="bottom"
                  >
                    <Button type="link">
                      <MinusOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>
                <Tooltip title={'Ver Detalhes'}>
                  <Link
                    to={`/movimento-recursos/detalhes/${supplyMovement?.id}`}
                  >
                    <Button type={'link'} icon={<EyeOutlined />} />
                  </Link>
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

      <Modal
        title="Devolução de Recursos"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={async (supplyMovement: Supply.DevolvedSupplyInput) => {
            await giveBackSupplyMovement(movement?.id, supplyMovement);
          }}
        >
          <Form.Item
            label="Quantidade a devolver"
            name={'reservedQuantity'}
            rules={[
              {
                required: true,
                message: 'A quantidade a devolver é obrigatória',
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ marginTop: 40 }}>
            <Space direction="horizontal">
              <Button
                type="primary"
                htmlType="submit"
                icon={<RollbackOutlined />}
              >
                DEVOLVER
              </Button>

              <Button danger onClick={() => setOpen(false)}>
                CANCELAR
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </WrapperDefault>
  );
}
