import { Card, Col, List, Row } from 'antd';

export default function ApprovedTasks() {
  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Tarefas com Prazos Expirados">
            <List
              //dataSource={expiredTasksNotification}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 2,
              }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    description={
                      <>
                        <h1>Notificação de Tarefas Expiradas</h1>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
