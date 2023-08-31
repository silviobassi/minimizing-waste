import {
  Alert,
  Button,
  Col,
  Descriptions,
  Divider,
  Row,
  Space,
  Tag,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Assignment, User } from '../../sdk';
import EmployeesResponsible from '../components/EmployeesResponsible';
import WrapperDefault from '../components/WrapperDefault';

type AssignmentType = Assignment.AssignmentModel;

interface AssignmentProps {
  assignment: AssignmentType;
}

export default function TaskDetailed(props: AssignmentProps) {
  function isEmployeeResponsible(): boolean {
    return props?.assignment?.employeesResponsible.length;
  }

  return (
    <WrapperDefault title="Detalhes da Tarefa">
      <Row justify={'space-between'} gutter={60}>
        <Col xs={24} xl={12}>
          <Divider orientation="left">DADOS DA TAREFA</Divider>
          <Title
            level={4}
            style={{ marginBottom: 20, textDecoration: 'underline' }}
          >
            {props?.assignment?.title}
          </Title>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'Data do Início'}>
              <Space direction="horizontal">
                <Tag color="blue">
                  {format(new Date(props?.assignment?.startDate), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Prazo para Conclusão'}>
              <Space direction="horizontal">
                <Tag color="red">
                  {format(new Date(props?.assignment?.deadline), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Data da Finalização'}>
              <Space direction="horizontal">
                <Tag color="green">
                  {format(new Date(props?.assignment?.startDate), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Tipo da Tarefa'}>
              {props?.assignment?.nature}
            </Descriptions.Item>
            <Descriptions.Item label={'Setor'}>
              {props?.assignment?.workStation?.sector?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Estação de Trabalho'}>
              {props?.assignment?.workStation?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Localização da Estação de Trabalho'}>
              {props?.assignment?.workStation?.localization}
            </Descriptions.Item>
            <Descriptions.Item label={'Ponto específico da tarefa'}>
              {props?.assignment?.specificPoint}
            </Descriptions.Item>
            <Descriptions.Item label={'Finalizada?'}>
              <Space direction="horizontal">
                {props?.assignment?.completed ? (
                  <Tag color="blue">Sim</Tag>
                ) : (
                  <Tag color="red">Não</Tag>
                )}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Aprovada?'}>
              <Space direction="horizontal">
                {props?.assignment?.approved ? (
                  <Tag color="blue">Sim</Tag>
                ) : (
                  <Tag color="red">Não</Tag>
                )}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} lg={12}>
          <Divider orientation="left">RESPONSÁVEIS PELA TAREFA</Divider>

          {isEmployeeResponsible() ? (
            <Link to={`/tarefa/${props?.assignment?.id}/desatribuicao`}>
              <Button type="primary" danger style={{ marginBottom: 20 }}>
                Desatribuir
              </Button>
            </Link>
          ) : (
            ''
          )}

          {isEmployeeResponsible() ? (
            props?.assignment?.employeesResponsible.map(
              (employee: User.Assigned, key: number) => {
                return (
                  <EmployeesResponsible
                    key={key}
                    isAssignScreen={false}
                    employeeResponsible={employee}
                  />
                );
              },
            )
          ) : (
            <Alert
              action={
                <Space direction="vertical">
                  <Link to={`/tarefa/${props.assignment?.id}/atribuicao`}>
                    <Button type="primary">Atribuir Colaboradores</Button>
                  </Link>
                </Space>
              }
              message="Colaboradores"
              description="Não há nenhum colaborador atribuído à tarefa."
              type="info"
              showIcon
            />
          )}
        </Col>
      </Row>
    </WrapperDefault>
  );
}
