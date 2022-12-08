import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import WorkStationList from '../features/WorkStationList';
export default function WorkStationListView() {
  const navigate = useNavigate();
  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={(_) => navigate('/estacao-de-trabalho/criar')}
          >
            CRIAR ESTAÇÃO DE TRABALHO
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
          <WorkStationList />
        </Col>
      </Row>
    </>
  );
}
