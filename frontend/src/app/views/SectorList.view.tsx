import { Button, Col, Divider, Row } from 'antd';
import SectorList from '../features/SectorList';

export default function SectorListView() {
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button type={'primary'} size={'large'}>
            CRIAR SETOR
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
          <SectorList />
        </Col>
      </Row>
    </>
  );
}
