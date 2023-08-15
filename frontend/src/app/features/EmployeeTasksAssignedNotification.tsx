import {
  Button,
  Card,
  Col,
  Descriptions,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCommunications from '../../core/hooks/useCommunications';
import { Communication } from '../../sdk';
import NotificationDescription from '../components/NotificationDescription';

export default function EmployeeTasksAssignedNotification() {
  const { availableAssignedTasks, fetchAvailableAssignedTasks } =
    useCommunications();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchAvailableAssignedTasks(page);
  }, [fetchAvailableAssignedTasks, page]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Recursos Disponíveis">
            <List
              dataSource={
                availableAssignedTasks?._embedded?.notificationsAssignments
              }
              pagination={{
                onChange: (page: number) => setPage(page - 1),
                total: availableAssignedTasks?.page?.totalElements,
                pageSize: 2,
              }}
              rowKey={'id'}
              renderItem={(item: Communication.AssignmentNotification) => (
                <List.Item>
                  <Row justify={'space-between'} gutter={40}>
                    <Col xs={24} lg={7}>
                      <Typography.Title
                        level={4}
                        style={{
                          marginBottom: 20,
                          textDecoration: 'underline',
                        }}
                      >
                        {item.title}
                      </Typography.Title>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={'Prazo de Conclusão'}>
                          <Space direction="horizontal">
                            <Tag color="yellow">
                              {format(new Date(item.deadline), 'dd/MM/yyyy')}
                            </Tag>
                          </Space>
                        </Descriptions.Item>
                      </Descriptions>
                      <Link to={`/tarefa/${item.id}/detalhes`}>
                        <Button type="primary" style={{ marginTop: 20 }}>
                          Ver Responsáveis
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={24} lg={9}>
                      <Descriptions column={1} size="small" bordered>
                        <Descriptions.Item label={'Estação de Trabalho'}>
                          {item.workStation?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Localização'}>
                          {item.workStation?.localization}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Setor'}>
                          {item.workStation?.sector?.name}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>

                    <Col xs={24} lg={8}>
                      <NotificationDescription
                        notification={item?.notification}
                      />
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
