import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import AssignmentList from '../features/TaskList';

export default function TaskListView() {
  usePageTitle('Lista de Tarefas');
  const navigate = useNavigate();

  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={() => navigate('/tarefa/criar')}
          >
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
          <AssignmentList />
        </Col>
      </Row>
    </>
  );
}
