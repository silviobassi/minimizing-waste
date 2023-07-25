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
import { Link } from 'react-router-dom';
import { Communication } from '../../sdk/@types';

interface NotificationAssignmentsProps {
  assignments: Communication.AssignmentNotification;
  title: string;
}
export default function NotificationAssignments(
  props: NotificationAssignmentsProps,
) {
  return (
    <Row>
      <Col xs={24}>
        <Card type="inner" title={props.title}>
          <List
            dataSource={props.assignments}
            renderItem={(
              assignmentNotification: Communication.AssignmentNotification,
            ) => (
              <List.Item>
                <Row justify={'space-between'} gutter={60}>
                  <Col xs={24} lg={7}>
                    <Typography.Title level={3}>
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
                  {assignmentNotification.notification && (
                    <Col xs={24} lg={9}>
                      <Tag color="red">
                        <Typography.Title level={3}>
                          Observação:
                        </Typography.Title>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label={'Título'}>
                            {assignmentNotification.notification?.title}
                          </Descriptions.Item>
                          <Descriptions.Item label={'Data da Notificação'}>
                            {format(
                              new Date(
                                assignmentNotification.notification?.createdAt,
                              ),
                              'dd/MM/yyyy',
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item label={'Motivo'}>
                            {assignmentNotification.notification?.reason}
                          </Descriptions.Item>
                          <Descriptions.Item label={'Objetivo'}>
                            {assignmentNotification.notification?.goal}
                          </Descriptions.Item>
                        </Descriptions>
                      </Tag>
                    </Col>
                  )}
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
}
