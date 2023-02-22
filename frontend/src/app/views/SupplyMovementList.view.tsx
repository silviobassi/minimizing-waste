import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import SupplyMovementList from '../features/SupplyMovementList';

export default function SupplyMovementListView() {
  usePageTitle('Lista de Movimento de Recursos');
  const navigate = useNavigate();

  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={() => navigate('/movimento-recursos/criar')}
          >
            CRIAR MOVIMENTO DE RECURSO
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
          <SupplyMovementList />
        </Col>
      </Row>
    </>
  );
}
