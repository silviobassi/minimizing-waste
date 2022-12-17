import { Card, Col, List, Row } from 'antd';
import { useEffect, useState } from 'react';

interface EmployeeAllocationNotification {
  title: string;
  notificationDate: string;
  reason: string;
  goal: string;
  sector: string;
  workStation: string;
  employeeName: string;
  office: string;
  occupation: string;
}

export default function EmployeeAllocationNotification() {
  const [employeeAllocationNotification, setEmployeeAllocationNotification] =
    useState<EmployeeAllocationNotification[]>([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const loadMoreData = () => {
    const data: EmployeeAllocationNotification[] = [];
    for (let i: number = 1; i < 20; i++) {
      data.push({
        title: `Cimento não usado - ${i}`,
        notificationDate: '22/12/2022',
        reason: `Mudança de Cronograma - ${i}`,
        goal: `Concluir contrapiso no Bloco B${i} Apto 1${i}`,
        sector: 'Acabamento',
        workStation: `Bloco B${i} Apto 27${i}`,
        employeeName: 'Pedro Bassi',
        office: 'Azulejista',
        occupation: 'Instalador de Revestimento',
      });
    }

    setEmployeeAllocationNotification(data);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Alocação de Colaboradores">
            <List
              dataSource={employeeAllocationNotification}
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
                          <Col xs={24} xl={7}>
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
                          <Col xs={24} xl={7}>
                            <p>
                              <strong>Setor: </strong>
                              {item.sector}
                            </p>
                            <p>
                              <strong>Estação de Trabalho: </strong>
                              {item.workStation}
                            </p>
                            <p>
                              <strong>Nome do Responsável: </strong>
                              {item.employeeName}
                            </p>
                            <p>
                              <strong>Cargo: </strong>
                              {item.office}
                            </p>
                          </Col>
                          <Col xs={24} xl={7}>
                            <p>
                              <strong>Função: </strong>
                              {item.occupation}
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
