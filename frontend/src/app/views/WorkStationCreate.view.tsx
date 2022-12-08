import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationCreateView() {
  return (
    <>
      <Row>
        <Col xs={24}>
          <Divider />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24}>
          <WorkStationForm
            labelRegister="CRIAR"
            iconButton={{
              register: <SaveOutlined />,
              cancel: <StopOutlined />,
            }}
            title="Criação de Estação de Trabalho"
          />
        </Col>
      </Row>
    </>
  );
}
