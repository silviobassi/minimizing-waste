import { Button, Col, Divider, Row } from 'antd';
import usePageTitle from '../../core/usePageTitle';
import SectorEdit from '../features/SectorEdit';

export default function SetorEditView() {
  usePageTitle('Edição de Setor');

  return (
    <>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <SectorEdit />
        </Col>
      </Row>
    </>
  );
}
