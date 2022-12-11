import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import usePageTitle from '../../core/usePageTitle';
import SectorForm from '../features/SectorForm';

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
          <SectorForm
            labelRegister="EDITAR"
            iconButton={{
              register: <EditOutlined />,
              cancel: <StopOutlined />,
            }}
            title="Edição de Setor"
          />
        </Col>
      </Row>
    </>
  );
}