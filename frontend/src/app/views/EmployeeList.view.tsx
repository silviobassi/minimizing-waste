import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import UserList from '../features/EmployeeList';
export default function EmployeeListView() {
  usePageTitle('Lista de Colaboradores');

  const navigate = useNavigate();
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={() => navigate('/colaborador/criar')}
          >
            CRIAR COLABORADORES
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
          <UserList />
        </Col>
      </Row>
    </>
  );
}
