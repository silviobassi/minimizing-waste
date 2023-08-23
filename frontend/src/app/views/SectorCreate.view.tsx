import { Col, Divider, Row } from 'antd';
import usePageTitle from '../../core/usePageTitle';
import SectorForm from '../features/SectorForm';

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
          <SectorForm title="Criação de Setor" />
        </Col>
      </Row>
    </>
  );
}
