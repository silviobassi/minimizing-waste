import {
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

import { useEffect } from 'react';
import useCommunications from '../../core/hooks/useCommunications';

export default function SupplyAvailableAssignedNotification() {
  const { availableSupplies, fetchAvailableSupplies } = useCommunications();

  useEffect(() => {
    fetchAvailableSupplies();
  }, [fetchAvailableSupplies]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Recursos Disponìveis">
            <List
              dataSource={availableSupplies}
              rowKey={'id'}
              renderItem={(item) => (
                <List.Item>
                  <Row justify={'space-between'} gutter={60}>
                    <Col xs={24} lg={7}>
                      <Typography.Title level={3}>
                        {item.supply?.name}
                      </Typography.Title>
                      <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={'Quantidade'}>
                          <Space direction="horizontal">
                            {`${item.supply?.supplyDescription?.total}`}
                            <Tag color="green">
                              {item.supply?.supplyDescription?.measureUnitType}
                            </Tag>
                          </Space>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col xs={24} lg={8}>
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
                    {item.notification && (
                      <Col xs={24} lg={9}>
                        <Tag color="red">
                          <Typography.Title level={3}>
                            Observação:
                          </Typography.Title>
                          <Descriptions column={1} size="small">
                            <Descriptions.Item label={'Título'}>
                              {item.notification?.title}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={'Data da Notificação'}
                            >
                              {format(
                                new Date(item.notification?.createdAt),
                                'dd/MM/yyyy',
                              )}
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
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
