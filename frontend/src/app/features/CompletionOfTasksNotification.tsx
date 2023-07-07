import { Card, Col, List, Row } from 'antd';

export default function CompletionOfTasksNotification() {
  return (
    <>
      <Row>
        <Col xs={24}>
          <Card type="inner" title="Conclusão de Tarefas">
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
                        <h1>Notificação de Tarefas Completas</h1>
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
