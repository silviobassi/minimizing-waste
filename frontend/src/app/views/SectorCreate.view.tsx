import { Col, Divider, Row } from 'antd';
import usePageTitle from '../../core/usePageTitle';
import SectorCreate from '../features/SectorCreate';

export default function SetorCreateView() {
  usePageTitle('Criação de Setor');

  return (
    <>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <SectorCreate />
        </Col>
      </Row>
    </>
  );
}
