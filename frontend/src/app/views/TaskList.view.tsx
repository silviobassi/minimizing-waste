import { Button, Col, Divider, Row } from 'antd';
import TaskList from '../features/TaskList';

export default function TaskListView() {
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button type={'primary'} size={'large'}>
            CRIAR TAREFAS
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <TaskList />
        </Col>
      </Row>
    </>
  );
}
