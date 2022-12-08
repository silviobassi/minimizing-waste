import { SaveOutlined, SendOutlined, StopOutlined } from '@ant-design/icons';
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
          <SectorForm
            labelRegister="CRIAR"
            iconButton={{
              register: <SaveOutlined />,
              cancel: <StopOutlined />,
            }}
            title='Criação de Setor'
          />
        </Col>
      </Row>
    </>
  );
}
