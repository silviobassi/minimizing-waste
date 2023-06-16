import { Col, Descriptions, Row } from 'antd';
import { User } from '../../sdk/@types/User';
import WrapperDefault from '../components/WrapperDefault';

type EmployeeDetailed = User.Detailed;

interface EmployeeDetailedDefault {
  employee: EmployeeDetailed;
}

export default function EmployeeDetailed(props: EmployeeDetailedDefault) {
  return (
    <WrapperDefault title="Detalhes do Colaborador">
      <Row justify={'start'} gutter={24}>
        <Col xs={24} lg={12}>
         
        </Col>
      </Row>
    </WrapperDefault>
  );
}
