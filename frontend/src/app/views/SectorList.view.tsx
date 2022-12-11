import { Button, Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import SectorList from '../features/SectorList';

export default function SectorListView() {
  usePageTitle('Lista de Setores');
  const navigate = useNavigate();

  return (
    <>
      <Row justify={'center'}>
        <Col xs={24}>
          <Button
            type={'primary'}
            size={'large'}
            onClick={(_) => navigate('/setor/criar')}
          >
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
