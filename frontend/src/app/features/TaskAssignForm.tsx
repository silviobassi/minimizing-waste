import {
  ClearOutlined,
  ReconciliationOutlined,
  StopOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  List,
  Row,
  Skeleton,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import WrapperDefault from '../components/WrapperDefault';

interface EmployeeSummary {
  id: number;
  name: string;
  office: string;
  occupation: string;
}

interface TaskSummary {
  title: string;
  deadline: string;
  nature: string;
  sector: string;
  workStation: string;
}

export default function TaskAssignForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
  const [employeesAssign, setEmployeesAssign] = useState<EmployeeSummary[]>([]);
  const [task, setTask] = useState<TaskSummary>();

  const data: EmployeeSummary[] = [];

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    for (let i = 1; i < 5; i++) {
      employees.push({
        id: i,
        name: `Pedro Bassi ${i}`,
        office: `Azulejista`,
        occupation: `Encarregado de Acabamento`,
      });
    }
    setLoading(false);
  };

  const taskSingle: TaskSummary = {
    title: 'Organização de Ferramentas',
    deadline: '22/06/2023 à 23/06/2023',
    nature: 'Limpeza',
    sector: 'Acabamento',
    workStation: 'Bloco B26 Apto 176',
  };

  useEffect(() => {
    loadMoreData();
    setTask(taskSingle);
  }, [setEmployees, setEmployeesAssign]);

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <WrapperDefault title="Atribuição de Tarefas">
      <Row justify={'space-between'}>
        <Col xs={24} xl={12}>
          <Divider orientation="left">
            COLABORADORES DISPONÍVEIS À ALOCAÇÃO
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
              dataLength={employees.length}
              next={loadMoreData}
              hasMore={employees.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={
                <Divider plain>Isto é tudo, Não há mais nada 🤐</Divider>
              }
              scrollableTarget="scrollableDiv"
            >
              <List
                itemLayout="horizontal"
                dataSource={employees}
                renderItem={(employee) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://i.pravatar.cc/300?img=${employee.id}`}
                        />
                      }
                      title={employee.name}
                      description={
                        <>
                          <p>
                            <strong>Cargo: </strong>
                            {employee.office}
                          </p>
                          <p>
                            <strong>Função: </strong>
                            {employee.occupation}
                          </p>
                          <Button
                            type="primary"
                            ghost
                            size="small"
                            icon={<UserAddOutlined />}
                            onClick={() => {
                              setEmployeesAssign([
                                ...employeesAssign,
                                employee,
                              ]);

                              //employees.splice(employee.id, 1)

                              const emp = employees.filter(
                                (current) => current.id !== employee.id,
                              );

                              setEmployees(
                                employees.filter(
                                  (current) => current.id !== employee.id,
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
          <Divider orientation="left">TAREFA A ATRIBUIR</Divider>
          <p>
            {' '}
            <strong>Título: </strong>
            {task?.title}
          </p>

          <p>
            <strong>Período de Conclusão: </strong>
            {task?.deadline}
          </p>

          <p>
            {' '}
            <strong>Natureza: </strong>
            {task?.nature}
          </p>

          <p>
            <strong>Setor: </strong>
            {task?.sector}
          </p>

          <p>
            <strong>Estação de Trabalho: </strong>
            {task?.workStation}
          </p>
          <Divider orientation="left">
            Colaboradores Atribuídos à Tarefa
          </Divider>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={employeesAssign}
              renderItem={(employeeAssign) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={'large'}
                        src={`https://i.pravatar.cc/300?img=${employeeAssign.id}`}
                      />
                    }
                    title={employeeAssign.name}
                    description={
                      <>
                        <p>
                          <strong>Cargo: </strong>
                          {employeeAssign.office}
                        </p>
                        <p>
                          <strong>Função: </strong>
                          {employeeAssign.occupation}
                        </p>
                        <Button
                          type="primary"
                          ghost
                          size="small"
                          icon={<ClearOutlined />}
                          onClick={() => {
                            setEmployees([...employees, employeeAssign]);

                            setEmployeesAssign(
                              employeesAssign.filter(
                                (current) => current.id !== employeeAssign.id,
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
          <Form.Item >
            <Space direction="horizontal">
              <Button type="primary" icon={<ReconciliationOutlined />}>
                Atribuir
              </Button>
              <Button type="primary" danger icon={<StopOutlined />}>
                Cancelar
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
