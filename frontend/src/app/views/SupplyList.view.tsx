import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import SupplyList from '../features/SupplyList';

export default function SupplyListView() {
  usePageTitle('Lista de Recursos')

  const navigate = useNavigate();
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={(_) => navigate('/recursos/criar')}
          >
            CRIAR RECURSO
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
          <SupplyList />
        </Col>
      </Row>
    </>
  );
}
