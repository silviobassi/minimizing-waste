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

import { useEffect, useState } from 'react';
import useCommunications from '../../core/hooks/useCommunications';
import { Communication } from '../../sdk';
import NotificationDescription from '../components/NotificationDescription';

export default function SupplyAvailableAssignedNotification() {
  const { availableSupplies, fetchAvailableSupplies } = useCommunications();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchAvailableSupplies(page);
  }, [fetchAvailableSupplies, page]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Recursos Disponìveis">
            <List
              dataSource={
                availableSupplies?._embedded?.supplyMovementNotifications
              }
              pagination={{
                onChange: (page: number) => setPage(page - 1),
                total: availableSupplies?.page?.totalElements,
                pageSize: 2,
              }}
              rowKey={'id'}
              renderItem={(
                item: Communication.SupplyMovementNotificationModel,
              ) => (
                <List.Item>
                  <Row justify={'space-between'} gutter={60}>
                    <Col xs={24} lg={7}>
                      <Typography.Title
                        level={4}
                        style={{
                          marginBottom: 20,
                          textDecoration: 'underline',
                        }}
                      >
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
