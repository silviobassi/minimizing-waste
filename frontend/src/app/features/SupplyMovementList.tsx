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
  Descriptions,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
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

  const { suppliesMovements, fetchSuppliesMovements, fetching } =
    useSuppliesMovements();

  const { userAuth } = useAuth();
  const { xs } = useBreakpoint();
  const {
    removeSupplyMovement,
    vacateSupplyMovement,
    giveBackSupplyMovement,
    endSupply,
  } = useSupplyMovement();

  useEffect(() => {
    fetchSuppliesMovements({ page, size: 4, sort: ['asc'] }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchSuppliesMovements, page]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return (
    <>
      <Button
        style={xs ? { width: '100%' } : { display: 'flex' }}
        type={'primary'}
        size={'large'}
        onClick={() => navigate('/movimento-recursos/criar')}
      >
        CRIAR MOVIMENTO DE RECURSO
      </Button>
      <Divider />
      <WrapperDefault title="MOVIMENTO DE RECURSOS">
        <Table<Supply.PagedModelSupplyMovementModel>
          loading={fetching}
          dataSource={suppliesMovements?._embedded?.suppliesMovements}
          columns={[
            {
              title: 'Recursos',
              responsive: ['xs'],
              render(movement: Supply.PagedModelSupplyMovementModel) {
                return (
                  <Space direction="vertical">
                    <Descriptions column={1} size={'small'}>
                      <Descriptions.Item label={'Nome'}>
                        <Row> {movement?.supply?.name}</Row>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Estação'}>
                        {movement?.workStation?.localization}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Setor'}>
                        {movement?.workStation?.sector?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Qtd Unitária'}>
                        {movement?.supply?.supplyDescription?.quantity}{' '}
                        UNIDADE(s)
                      </Descriptions.Item>
                      <Descriptions.Item label={'Qtd Alocada'}>
                        {movement?.allocatedQuantity}{' '}
                        {movement?.supply?.supplyDescription?.measureUnitType}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Total'}>
                        {movement?.supply?.supplyDescription?.total}{' '}
                        {movement?.supply?.supplyDescription?.measureUnitType}
                      </Descriptions.Item>
                      <Descriptions.Item>
                        <Space>
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
                          {movement?.movable ? (
                            <Tag color="blue">MOVIMENTÁVEL</Tag>
                          ) : (
                            <Tag color="red">IMOVIMENTÁVEL</Tag>
                          )}
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Ações'}>
                        <Tooltip title={'Editar'}>
                          <Button
                            type={'link'}
                            icon={<EditOutlined />}
                            onClick={() =>
                              navigate(
                                `/movimento-recursos/editar/${movement?.id}`,
                              )
                            }
                          />
                        </Tooltip>

                        <DoubleConfirm
                          popConfirmTitle="Remover Movimento?"
                          popConfirmContent="Deseja mesmo remover este movimento?"
                          onConfirm={async () => {
                            await removeSupplyMovement(Number(movement?.id));
                            notification.success({
                              message: 'Sucesso',
                              description: `Movimento do recurso ${movement?.supply?.name}  removido com sucesso`,
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
                                id: movement?.id,
                                supplyName: movement?.supply?.name,
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
                            await endSupply(Number(movement?.id));
                            notification.success({
                              message: 'Sucesso',
                              description: `Quantidade do recurso: ${movement?.supply?.name} utilizada, deduzida com sucesso`,
                            });
                          }}
                        >
                          <Tooltip
                            title={'Finalizar Recurso Alocado'}
                            placement="bottom"
                          >
                            <Button type="link">
                              <MinusOutlined />
                            </Button>
                          </Tooltip>
                        </DoubleConfirm>
                        <Tooltip title={'Ver Detalhes'}>
                          <Link
                            to={`/movimento-recursos/detalhes/${movement?.id}`}
                          >
                            <Button type={'link'} icon={<EyeOutlined />} />
                          </Link>
                        </Tooltip>
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                );
              },
            },
            { title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'] },
            {
              title: 'Nome do Recurso',
              dataIndex: ['supply', 'name'],
              width: 300,
              responsive: ['sm'],
            },
            {
              title: 'Estação de Trabalho',
              dataIndex: ['workStation', 'name'],
              width: 300,
              responsive: ['sm'],
            },
            {
              title: 'Setor',
              dataIndex: ['workStation', 'sector', 'name'],
              width: 300,
              responsive: ['sm'],
            },
            {
              title: 'QTD Disponível',
              dataIndex: ['supply', 'supplyDescription', 'quantity'],
              width: 120,
              responsive: ['sm'],
            },
            {
              title: 'QTD Alocada',
              dataIndex: 'allocatedQuantity',
              width: 120,
              responsive: ['sm'],
            },
            {
              title: 'Desocupado?',
              dataIndex: 'notBusy',
              align: 'center',
              responsive: ['sm'],
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
              responsive: ['sm'],
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
              responsive: ['sm'],
              render: (_: any, supplyMovement) => (
                <Space size={'small'}>
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
                      title={'Finalizar Recurso Alocado'}
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
              notification.success({
                message: 'Sucesso',
                description: `Recurso ${movement?.supplyName}  devolvido com sucesso`,
              });
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
    </>
  );
}
