import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import SupplyList from '../features/SupplyList';

export default function SupplyListView() {
  const navigate = useNavigate();
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={(_) => navigate('/recurso/criar')}
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
