import { Button, Col, Divider, Row } from 'antd';
import SupplyList from '../features/SupplyList';

export default function SupplyListView() {
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button type={'primary'} size={'large'}>
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
