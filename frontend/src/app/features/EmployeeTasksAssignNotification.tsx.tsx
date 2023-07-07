import { Card, Col, Descriptions, List, Row, Tag, Typography } from 'antd';

import { format } from 'date-fns';
import { useEffect } from 'react';
import useCommunications from '../../core/hooks/useCommunications';
import { User } from '../../sdk';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';

export default function EmployeeTasksAssignNotification() {
  const { availableAssignments, fetchAvailableAssignments } =
    useCommunications();

  useEffect(() => {
    fetchAvailableAssignments();
  }, [fetchAvailableAssignments]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Recursos Disponìveis">
            <List
              dataSource={availableAssignments}
              rowKey={'id'}
              renderItem={(item) => (
                <List.Item>
                  <Row justify={'space-between'} gutter={60}>
                    <Col xs={24}>
                      <Typography.Title level={3}>
                        {item.title}
                      </Typography.Title>

                      <Typography.Title level={5}>
                        Prazo Para Conclusão:
                        <Typography.Text
                          type="danger"
                          style={{ marginLeft: 10 }}
                        >
                          {format(new Date(item.deadline), 'dd/MM/yyyy')}
                        </Typography.Text>
                      </Typography.Title>
                    </Col>

                    {item.employeeResponsible?.map(
                      (employee: User.UserAssignment) => {
                        return (
                          <>
                            <Col xs={24} lg={12}>
                              <Descriptions
                                column={1}
                                bordered
                                size="small"
                                style={{ marginTop: 40 }}
                              >
                                <Descriptions.Item label={'Colaborador'}>
                                  {employee?.name}
                                </Descriptions.Item>
                                <Descriptions.Item label={'WhatsApp'}>
                                  {phoneToFormat(employee?.whatsApp)}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Cargo'}>
                                  <Tag color="blue">{employee?.office}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={'Função'}>
                                  <Tag color="green">
                                    {employee?.occupation}
                                  </Tag>
                                </Descriptions.Item>
                              </Descriptions>
                            </Col>
                          </>
                        );
                      },
                    )}

                    <Col xs={24}>
                      <Row gutter={60}>
                        <Col xs={24} lg={12} style={{ marginTop: 40 }}>
                          <Descriptions column={1} size="small" bordered>
                            <Descriptions.Item label="Estação de Trabalho">
                              {item.workStation?.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Localização">
                              {item.workStation?.localization}
                            </Descriptions.Item>
                            <Descriptions.Item label="Setor">
                              {item.workStation?.sector?.name}
                            </Descriptions.Item>
                          </Descriptions>
                        </Col>

                        {item.notification && (
                          <Col xs={24} lg={12} style={{ marginTop: 40 }}>
                            <Tag color="red">
                              <Typography.Title level={3}>
                                Observação:
                              </Typography.Title>
                              <Descriptions column={1} size="small">
                                <Descriptions.Item label={'Título'}>
                                  {item.notification?.title}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Motivo'}>
                                  {item.notification?.reason}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Objetivo'}>
                                  {item.notification?.goal}
                                </Descriptions.Item>
                              </Descriptions>
                            </Tag>
                          </Col>
                        )}
                      </Row>
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
