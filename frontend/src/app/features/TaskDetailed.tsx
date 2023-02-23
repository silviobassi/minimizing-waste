import { Col, Divider, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../sdk/@types/Assignment';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskDetailed() {
  const params = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task.Detailed>();

  const data: Task.Detailed = {
    id: Number(params.taskId),
    title: 'Revestimento de Banheiros',
    startDate: '22/03/2023',
    endDate: '22/05/2023',
    deadline: '22/04/2023',
    completed: true,
    approved: false,
    approvalDescription: 'Rejuntamento e instalação dos recortes desajustados',
    nature: 'Obras',
    workStation: 'Bloco B12 Apto 267',
    sector: 'Acabamento',
    employeeResponsible: {
      name: 'Silvio Luiz Bassi',
      office: 'Azulejista',
      occupation: 'Prestador de Serviço',
      whatsApp: '17 996079654',
    },
  };

  useEffect(() => {
    setTask(data);
  }, [setTask]);

  return (
    <WrapperDefault title="Detalhes do Recurso">
      <Row justify={'space-between'}>
        <Col xs={24} xl={12}>
          <Divider orientation="left">DADOS DA TAREFA</Divider>
          <p>
            <strong>Título: </strong>
            {task?.title}
          </p>
          <p>
            <strong>Data de Início: </strong>
            {task?.startDate}
          </p>
          <p>
            <strong>Prazo para Conclusão: </strong>
            {`${task?.startDate} à ${task?.deadline}`}
          </p>
          <Divider orientation="left">ESTADO DA TAREFA</Divider>
          <Row>
            <Col style={{ marginRight: 20 }}>
              <strong>Foi Finalizada? </strong>
            </Col>
            <Col>
              {' '}
              <p>
                {task?.completed ? (
                  <Tag color="blue">FINALIZADA</Tag>
                ) : (
                  <Tag color="red">PENDENTE</Tag>
                )}
              </p>
            </Col>
          </Row>

          <Row>
            <Col style={{ marginRight: 20 }}>
              <strong>Foi Aprovada? </strong>
            </Col>
            <Col>
              {' '}
              <p>
                {task?.approved ? (
                  <Tag color="blue">APROVADA</Tag>
                ) : (
                  <Tag color="red">REPROVADA</Tag>
                )}
              </p>
            </Col>
          </Row>
          {!task?.approved && (
            <p>
              <strong>Motivo da Reprovação: </strong>
              {task?.approvalDescription}
            </p>
          )}
        </Col>
        <Col xs={24} xl={11}>
          <Divider orientation="left">LOCALIZAÇÃO DA TAREFA</Divider>
          <p>
            <strong>Setor: </strong>
            {task?.sector}
          </p>
          <p>
            <strong>Estação de Trabalho: </strong>
            {task?.workStation}
          </p>
          <Divider orientation="left">
            COLABORADOR RESPONSÁVEL PELA TAREFA
          </Divider>
          <p>
            <strong>Nome: </strong>
            {task?.employeeResponsible.name}
          </p>
          <p>
            <strong>Cargo: </strong>
            {task?.employeeResponsible.office}
          </p>
          <p>
            <strong>Função: </strong>
            {task?.employeeResponsible.occupation}
          </p>
          <p>
            <strong>WhatsApp: </strong>
            {task?.employeeResponsible.whatsApp}
          </p>
        </Col>
      </Row>
    </WrapperDefault>
  );
}
