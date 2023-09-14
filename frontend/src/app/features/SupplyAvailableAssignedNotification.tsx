import { Col, Descriptions, List, Row, Space, Tag, Typography } from 'antd';

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import useCommunications from '../../core/hooks/useCommunications';
import { Communication } from '../../sdk';
import NotificationDescription from '../components/NotificationDescription';

export default function SupplyAvailableAssignedNotification() {
  const { availableSupplies, fetchAvailableSupplies, fetching } =
    useCommunications();
  const { xs, sm } = useBreakpoint();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchAvailableSupplies(page);
  }, [fetchAvailableSupplies, page]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <List
            loading={fetching}
            dataSource={
                //@ts-ignore
              availableSupplies?._embedded?.supplyMovementNotifications
            }
            pagination={{
              onChange: (page: number) => setPage(page - 1),
                //@ts-ignore
              total: availableSupplies?.page?.totalElements,
              pageSize: 2,
            }}
            rowKey={'id'}
            renderItem={(
              item: Communication.SupplyMovementNotificationModel,
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
                      style={{
                        marginBottom: 20,
                        textDecoration: 'underline',
                      }}
                    >
                      {item.supply?.name}
                    </Typography.Title>
                    <Descriptions
                      column={1}
                      bordered
                      size="small"
                      style={
                        xs || sm ? { marginBottom: 20 } : { marginBottom: 0 }
                      }
                    >
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
                  <Col xs={24} lg={12}>
                    <Descriptions
                      column={1}
                      size="small"
                      bordered
                      style={
                        xs || sm
                          ? { marginTop: 20, marginBottom: 20 }
                          : { marginTop: 0 }
                      }
                    >
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
