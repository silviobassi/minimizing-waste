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
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCommunications from '../../core/hooks/useCommunications';
import { Communication } from '../../sdk';
import NotificationDescription from '../components/NotificationDescription';

export default function EmployeeTasksAssignedNotification() {
  const { availableAssignedTasks, fetchAvailableAssignedTasks, fetching } =
    useCommunications();
  const [page, setPage] = useState<number>(0);
  const { xs, sm } = useBreakpoint();
  useEffect(() => {
    fetchAvailableAssignedTasks(page);
  }, [fetchAvailableAssignedTasks, page]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <List
            loading={fetching}
            dataSource={
              //@ts-ignore
              availableAssignedTasks?._embedded?.notificationsAssignments
            }
            pagination={{
              onChange: (page: number) => setPage(page - 1),
              //@ts-ignore
              total: availableAssignedTasks?.page?.totalElements,
              pageSize: 2,
            }}
            rowKey={'id'}
            renderItem={(item: Communication.AssignmentNotification) => (
              <List.Item
                style={
                  xs || sm ? { padding: '25px 0px' } : { padding: '40px 0px' }
                }
              >
                <Row justify={'space-between'} gutter={40}>
                  <Col xs={24} lg={12}>
                    <Typography.Title
                      level={xs ? 5 : 4}
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
                    <Link to={`/tarefas/${item.id}/detalhes`}>
                      <Button
                        type="primary"
                        style={
                          xs
                            ? {
                                marginTop: 20,
                                marginBottom: 20,
                                width: '100%',
                              }
                            : sm
                            ? {
                                marginTop: 20,
                                marginBottom: 20,
                                display: 'flex',
                              }
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

                  <Col xs={24} lg={24}>
                    <NotificationDescription
                      notification={item?.notification}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
