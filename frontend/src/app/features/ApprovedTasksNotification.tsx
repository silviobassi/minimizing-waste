import { Card, Col, List, Row } from 'antd';

export default function ApprovedTasksNotification() {
  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Tarefas Aprovadas">
            <List
              //dataSource={}
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
                        <h1>Notificação de Tarefas Aprovadas</h1>
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
