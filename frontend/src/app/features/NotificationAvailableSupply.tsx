import { Card, Col, Divider, Form, List, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
interface SupplyAvailableNotification {
  title: string;
  notificationDate: string;
  reason: string;
  goal: string;
  sector: string;
  workStation: string;
  supplyName: string;
  supplyType: string;
  allocatedQuantity: string;
}

export default function NotificationAvailableSupply() {
  const [supplyAvailableNotification, setSupplyAvailableNotification] =
    useState<SupplyAvailableNotification[]>([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const loadMoreData = () => {
    const data: SupplyAvailableNotification[] = [];
    for (let i: number = 1; i < 20; i++) {
      data.push({
        title: `Cimento não Usado - ${i}`,
        notificationDate: '22/12/2022',
        reason: `Mudança no Cronograma`,
        goal: `Concluir contrapiso no Bloco B${i} Apto 27${i}`,
        sector: 'Acabamento',
        workStation: `Bloco B1${i} Apto 23${i}`,
        supplyName: 'Cimento',
        supplyType: 'Material',
        allocatedQuantity: `${i} saco (s)`,
      });
    }

    setSupplyAvailableNotification(data);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Row justify={'start'}>
        <Col xs={7}>
          <Form layout="vertical">
            <Form.Item label="Tipo de Notificações:*">
              <Select
                size="large"
                defaultValue="Selecione o Tipo das Notificações"
                onChange={handleChange}
                options={[
                  {
                    label: 'Disponibilidade de Recursos',
                    value: 'Disponibilidade de Recursos',
                  },
                  {
                    label: 'Alocação de Colaboradores',
                    value: 'Alocação de Colaboradores',
                  },
                  {
                    label: 'Conclusão de Tarefas',
                    value: 'Conclusão de Tarefas',
                  },
                  {
                    label: 'Tarefas Aprovadas',
                    value: 'Tarefas Aprovadas',
                  },
                  {
                    label: 'Tarefas com Prazos Expirados',
                    value: 'Tarefas com Prazos Expirados',
                  },
                  {
                    label: 'Atribuição de Tarefas aos Colaboradores',
                    value: 'Atribuição de Tarefas aos Colaboradores',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Disponibilidade de Recursos">
            <List
              dataSource={supplyAvailableNotification}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 2,
              }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    description={
                      <>
                        <Row justify={'start'}>
                          <Col xs={24} xl={12}>
                            <p>
                              <strong>Título:</strong> {item.title}
                            </p>
                            <p>
                              <strong>Data da Notificação:</strong>{' '}
                              {item.notificationDate}
                            </p>
                            <p>
                              <strong>Motivo:</strong> {item.reason}
                            </p>
                            <p>
                              <strong>Objetivo: </strong>
                              {item.goal}
                            </p>
                          </Col>
                          <Col xs={24} xl={12}>
                            <p>
                              <strong>Setor: </strong>
                              {item.sector}
                            </p>
                            <p>
                              <strong>Estação de Trabalho: </strong>
                              {item.workStation}
                            </p>
                            <p>
                              <strong>Nome do Recurso: </strong>
                              {item.supplyName}
                            </p>
                            <p>
                              <strong>Quantidade Alocada: </strong>
                              {item.allocatedQuantity}
                            </p>
                          </Col>
                        </Row>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
