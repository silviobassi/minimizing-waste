import { Card, Col, List, Row } from 'antd';
import { useEffect, useState } from 'react';

interface ApprovedTasksNotification {
  title: string;
  notificationDate: string;
  reason: string;
  goal: string;
  sector: string;
  workStation: string;
  employeeName: string;
  office: string;
  occupation: string;
  taskTitle: string;
  taskType: string;
  deadline: string;
}

export default function ApprovedTasksNotification() {
  const [approvedTasks, setApprovedTasks] = useState<ApprovedTasksNotification[]>([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const loadMoreData = () => {
    const data: ApprovedTasksNotification[] = [];
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
        taskTitle: 'Revestimento de Banheiros',
        taskType: 'Obras',
        deadline: '22/01/2023 à 12/03/2023',
      });
    }

    setApprovedTasks(data);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Tarefas Aprovadas">
            <List
              dataSource={approvedTasks}
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
                              <strong>Data de Início:</strong> {item.notificationDate}
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
                            <p>
                              <strong>Título da Tarefa: </strong>
                              {item.taskTitle}
                            </p>
                            <p>
                              <strong>Tipo da Tarefa: </strong>
                              {item.taskType}
                            </p>
                            <p>
                              <strong>Data de Finalização: </strong>
                              {item.deadline}
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
