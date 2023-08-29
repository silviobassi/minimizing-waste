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

export default function CompletionOfTasksNotification() {
  const { assignmentsCompleted, fetchAssignmentsCompleted, fetching } =
    useCommunications();

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetchAssignmentsCompleted(page);
  }, [fetchAssignmentsCompleted, page]);

  return (
    <Row>
      <Col xs={24}>
        <Card type="inner" title={'Tarefas Expiradas'}>
          <List
          loading={fetching}
            pagination={{
              onChange: (page: number) => setPage(page - 1),
              total: assignmentsCompleted?.page?.totalElements,
              pageSize: 2,
            }}
            dataSource={
              assignmentsCompleted?._embedded?.notificationsAssignments
            }
            renderItem={(
              assignmentNotification: Communication.AssignmentNotification,
            ) => (
              <List.Item>
                <Row justify={'space-between'} gutter={60}>
                  <Col xs={24} lg={7}>
                    <Typography.Title
                      level={4}
                      style={{ marginBottom: 20, textDecoration: 'underline' }}
                    >
                      {assignmentNotification?.title}
                    </Typography.Title>
                    <Descriptions column={1} bordered size="small">
                      <Descriptions.Item label={'Prazo de Conclusão'}>
                        <Space direction="horizontal">
                          <Tag color="red">
                            {format(
                              new Date(assignmentNotification.deadline),
                              'dd/MM/yyyy',
                            )}
                          </Tag>
                        </Space>
                      </Descriptions.Item>
                    </Descriptions>

                    <Link to={`/tarefas/${assignmentNotification.id}/detalhes`}>
                      <Button type="primary" style={{ marginTop: 20 }}>
                        Ver Responsáveis
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Descriptions column={1} size="small" bordered>
                      <Descriptions.Item label={'Estação de Trabalho'}>
                        {assignmentNotification.workStation?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Localização'}>
                        {assignmentNotification.workStation?.localization}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Setor'}>
                        {assignmentNotification.workStation?.sector?.name}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col xs={24} lg={8}>
                    <NotificationDescription
                      notification={assignmentNotification?.notification}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
}
