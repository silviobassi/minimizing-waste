import {
  ClearOutlined,
  ReconciliationOutlined,
  StopOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  InputNumber,
  List,
  Row,
  Select,
  Skeleton,
  Space,
} from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Navigate, useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';

interface SupplySummary {
  id: number;
  title: string;
  supplyType: string;
  quantityAvailable: string;
  quantity?: number;
}

interface WorkStationAllocate {
  name: string;
}

interface SectorAllocate {
  name: string;
  workStations: WorkStationAllocate[];
  quantityAllocate?: number;
}

export default function SupplyAllocateForm() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [supplies, setSupplies] = useState<SupplySummary[]>([]);
  const [suppliesAllocate, setSuppliesAllocate] = useState<SupplySummary[]>([]);
  const [sectorAllocate, setSectorAllocate] = useState<SectorAllocate>();

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    for (let i = 1; i < 5; i++) {
      supplies.push({
        id: i,
        title: `Cimento ${i}`,
        supplyType: `Material`,
        quantityAvailable: `${10 + 1 * i}`,
      });
    }
    setLoading(false);
  };

  const sectorSingle: SectorAllocate = {
    name: 'Estruturas em Concreto',
    workStations: [
      { name: 'Bloco B25 Apto 37' },
      { name: 'Bloco C4 Apto 28' },
      { name: 'Bloco G67 Apto 176' },
    ],
  };

  useEffect(() => {
    loadMoreData();
    setSectorAllocate(sectorSingle);
  }, [setSupplies, setSuppliesAllocate]);

  return (
    <WrapperDefault title="Atribuição de Colaborador">
      <Row justify={'space-between'}>
        <Col xs={24} xl={12}>
          <Divider orientation="left">
            Recursos Disponíveis para Alocação
          </Divider>
          <div
            id="scrollableDiv"
            style={{
              height: 440,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
          >
            <InfiniteScroll
              dataLength={supplies.length}
              next={loadMoreData}
              hasMore={supplies.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={
                <Divider plain>Isto é tudo, Não há mais nada 🤐</Divider>
              }
              scrollableTarget="scrollableDiv"
            >
              <List
                itemLayout="horizontal"
                dataSource={supplies}
                renderItem={(supply) => (
                  <List.Item>
                    <List.Item.Meta
                      title={supply.title}
                      description={
                        <>
                          <p>
                            <strong>Tipo do Recurso: </strong>
                            {supply.supplyType}
                          </p>
                          <p>
                            <strong>Quantidade Disponível: </strong>
                            {supply.quantityAvailable}
                          </p>
                          <Button
                            type="primary"
                            ghost
                            size="small"
                            icon={<UserAddOutlined />}
                            onClick={() => {
                              setSuppliesAllocate([
                                ...suppliesAllocate,
                                supply,
                              ]);

                              setSupplies(
                                supplies.filter(
                                  (current) => current.id !== supply.id,
                                ),
                              );
                            }}
                          >
                            Alocar
                          </Button>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Col>
        <Col xs={24} xl={11}>
          <Divider orientation="left">Setor a Alocar</Divider>

          <p>
            <strong>Setor: </strong>
            {sectorSingle.name}
          </p>
          <Form layout="vertical" form={form}>
            <Form.Item label="Estações de Trabalho:*">
              <Select
                size="large"
                placeholder="Selecione a Estação de Trabalho"
              >
                {sectorSingle.workStations.map((workStation) => (
                  <Option value={workStation.name}>{workStation.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <Divider orientation="left">
            Colaboradores Atribuídos à Tarefa
          </Divider>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={suppliesAllocate}
              renderItem={(supplyAllocate) => (
                <List.Item>
                  <List.Item.Meta
                    title={supplyAllocate.title}
                    description={
                      <>
                        <p>
                          <strong>Tipo do Recurso: </strong>
                          {supplyAllocate.supplyType}
                        </p>
                        <Form layout="vertical">
                          <Form.Item label="Quantidade a Alocar:*">
                            <InputNumber<number>
                              defaultValue={1}
                              min={1}
                              max={20}
                              style={{ width: 200 }}
                            />
                          </Form.Item>
                        </Form>
                        <Button
                          type="primary"
                          ghost
                          size="small"
                          icon={<ClearOutlined />}
                          onClick={() => {
                            setSupplies([...supplies, supplyAllocate]);

                            setSuppliesAllocate(
                              suppliesAllocate.filter(
                                (current) => current.id !== supplyAllocate.id,
                              ),
                            );
                          }}
                        >
                          Limpar
                        </Button>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          <Form.Item style={{ marginTop: 20 }}>
            <Space direction="horizontal">
              <Button type="primary" icon={<ReconciliationOutlined />}>
                Alocar
              </Button>
              <Button type="primary" danger icon={<StopOutlined />} onClick={() => navigate('/setores')}>
                Cancelar
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
