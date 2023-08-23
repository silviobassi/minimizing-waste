import { Button, Col, Divider, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import AccessProfileList from '../features/AccessProfileList';

export default function AccessProfileListView() {
  usePageTitle('Lista de Perfis de Acesso');
  const navigate = useNavigate();

  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Link to={'/perfil-de-acesso/criar'}>
            <Button type={'primary'} size={'large'}>
              CRIAR PERFIL DE ACESSO
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <AccessProfileList />
        </Col>
      </Row>
    </>
  );
}
