import { useEffect, useState } from 'react';
import useCommunications from '../../core/hooks/useCommunications';

import {
  Button,
  Col,
  Descriptions,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Communication } from '../../sdk';
import NotificationDescription from '../components/NotificationDescription';

export default function ApprovedTasksNotification() {
  const { assignmentsApproved, fetchAssignmentsApproved, fetching } =
    useCommunications();

  const { xs, sm } = useBreakpoint();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchAssignmentsApproved(page);
  }, [fetchAssignmentsApproved, page]);

  return (
    <Row>
      <Col xs={24}>
        <List
          loading={fetching}
          pagination={{
            onChange: (page: number) => setPage(page - 1),
            total: assignmentsApproved?.page?.totalElements,
            pageSize: 2,
          }}
          dataSource={assignmentsApproved?._embedded?.notificationsAssignments}
          renderItem={(
            assignmentNotification: Communication.AssignmentNotification,
          ) => (
            <List.Item
              style={
                xs || sm ? { padding: '25px 0px' } : { padding: '40px 0px' }
              }
            >
              <Row justify={'space-between'} gutter={60}>
                <Col xs={24} lg={12}>
                  <Typography.Title
                    level={xs ? 5 : 4}
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
                    <Button
                      type="primary"
                      style={
                        xs
                          ? { marginTop: 20, marginBottom: 20, width: '100%' }
                          : sm
                          ? { marginTop: 20, marginBottom: 20, display: 'flex' }
                          : { display: 'flex' }
                      }
                    >
                      Ver Responsáveis
                    </Button>
                  </Link>
                </Col>
                <Col xs={24} lg={12}>
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
                <Col xs={24} lg={24}>
                  <NotificationDescription
                    notification={assignmentNotification?.notification}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
