import { Col, Divider, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../@types/User';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeDetailed() {
  const params = useParams<{ supplyId: string }>();
  const [employee, setEmployee] = useState<User.Detailed>();

  const data: User.Detailed = {
    name: 'Pedro Oliveira Bassi',
    cpf: '999.999.999-99',
    email: 'pedrobassi@gmail.com',
    whatsApp: '(17) 9999 9999',
    office: 'Engenheiro Civil',
    occupation: 'Encarregado',
    levelOfEducation: 'Curso Superior',
    group: 'Operacional',
  };

  useEffect(() => {
    setEmployee(data);
  }, [setEmployee]);

  return (
    <WrapperDefault title="Detalhes do Recurso">
      <Row justify={'start'}>
        <Col xs={24} xl={24}>
          <Divider orientation="left">DADOS DO COLABORADOR</Divider>
          <p>
            <strong>Nome: </strong>
            {employee?.name}
          </p>
          <p>
            <strong>Email: </strong>
            {employee?.email}
          </p>

          <p>
            <strong>WhatsApp: </strong>
            {employee?.whatsApp}
          </p>

          <Row>
            <Col style={{ marginRight: 20 }}>
              <strong>Tipo de Usuário: </strong>
            </Col>
            <Col>
              <p>
                {employee?.group == 'ADMINISTRADOR' ? (
                  <Tag color="blue">{employee?.group.toUpperCase()}</Tag>
                ) : (
                  <Tag color="red">{employee?.group.toUpperCase()}</Tag>
                )}
              </p>
            </Col>
          </Row>
          <Divider orientation="left">PERFIL PROFISSIONAL</Divider>
          <p>
            <strong>Cargo: </strong>
            {employee?.office}
          </p>
          <p>
            <strong>Função: </strong>
            {employee?.occupation}
          </p>
          <p>
            <strong>Grau de Instrução: </strong>
            {employee?.levelOfEducation}
          </p>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
