import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import WorkStationForm from '../features/WorkStationForm';

export default function WorkStationEditView() {
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
            labelRegister="Editar"
            iconButton={{
              register: <EditOutlined />,
              cancel: <StopOutlined />,
            }}
            title="Edição de Estação de Trabalho"
          />
        </Col>
      </Row>
    </>
  );
}
