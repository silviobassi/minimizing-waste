import { useEffect, useState } from "react";
import useAssignmentsResponsible from "../../core/hooks/useAssignmentsResponsible";
import AccessDenied from "../components/AccessDenied";
import WrapperDefault from "../components/WrapperDefault";
import { Card, Col, Descriptions, Divider, Form, Input, List, Row, Tag } from "antd";
import moment from 'moment'
import { CloseCircleOutlined } from "@ant-design/icons";
import ReloadList from "../components/ReloadList";

export default function AssignmentResponsibleList(){
  const { assignmentsResponsible, fetchAssignmentsResponsible, fetching } =
    useAssignmentsResponsible();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const [responsibleName, setResponsibleName] = useState<string>('');
  const [responsibleCpf, setResponsibleCpf] = useState<string>('');

  const [page, setPage] = useState<number>(0);

  const form = useEffect(() => {
    fetchAssignmentsResponsible({
      page,
      size: 2,
      sort: ['title', 'asc'],
      responsibleName,
      responsibleCpf,
    }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }
      throw err;
    });
  }, [fetchAssignmentsResponsible, responsibleName, responsibleCpf, page]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return <WrapperDefault title="Pesquisa de Tarefas por Responsável">
  <Form layout="vertical">
    <Row gutter={20}>
      <Col xs={24} lg={10}>
        <Form.Item label="Pesquisar por nome" name={'responsibleName'}>
          <Input
            size="large"
            onChange={(e: any) => {
              setResponsibleName(e.target.value);
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={10}>
        <Form.Item label="Pesquisar por CPF" name={'responsibleCpf'}>
          <Input
            size="large"
            onChange={(e: any) => {
              setResponsibleCpf(e.target.value);
            }}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
  <Divider />
  <List
    style={{ width: '100%' }}
    loading={fetching}
    //@ts-ignore
    dataSource={assignmentsResponsible?._embedded?.assignments}
    pagination={{
      onChange: (page: number) => setPage(page - 1),
      //@ts-ignore
      total: assignmentsResponsible?.page?.totalElements,
      pageSize: 2,
    }}
    renderItem={(item, index) => (
      <List.Item>
        <Row justify={'space-between'} align={'top'} gutter={30}>
          <Col xs={24} lg={12}>
            <Divider orientation="left">
              DESCRIÇÃO DA TAREFA {item?.title?.toUpperCase()}
            </Divider>
            <Card
              style={{
                backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#f2f7fc',
              }}
            >
              <Descriptions
                column={1}
                bordered
                size="small"
                style={{ backgroundColor: '#fff' }}
              >
                <Descriptions.Item label="Ponto Específico da Tarefa">
                  {item?.specificPoint}
                </Descriptions.Item>
                <Descriptions.Item label="Data de Início">
                  {moment(item?.startDate).format('DD/MM/YYYY HH:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Prazo para Conclusão">
                  {moment(item?.deadline).format('DD/MM/YYYY HH:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Data de Finalização">
                  {moment(item?.endDate).format('DD/MM/YYYY HH:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Estado de Finalização">
                  {item?.completed ? (
                    <Tag color="BLUE">FINALIZADA</Tag>
                  ) : (
                    <Tag color="RED">PENDENTE</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Estado de Aprovação">
                  {item?.approved ? (
                    <Tag color="BLUE">APROVADA</Tag>
                  ) : (
                    <Tag color="RED">PENDENTE</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Natureza da Tarefa">
                  {item?.nature}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Divider orientation="left">
              DESCRIÇÃO DO LOCAL DA TAREFA
            </Divider>
            <Card
              style={{
                backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#f2f7fc',
              }}
            >
              <Descriptions
                column={1}
                bordered
                size="small"
                style={{ backgroundColor: '#fff' }}
              >
                <Descriptions.Item label="Estação de Trabalho">
                  {item?.workStation?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Localização">
                  {item?.workStation?.localization}
                </Descriptions.Item>
                <Descriptions.Item label="Setor">
                  {item?.workStation?.sector?.name}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24}>
            <Divider orientation="left">
              DESCRIÇÃO DO FOCO E MOTIVO DA TAREFA
            </Divider>
            <Card
              style={{
                backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#f2f7fc',
              }}
            >
              <Descriptions column={1}>
                <Descriptions.Item label="Título">
                  {item?.notification?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Objetivo">
                  {item?.notification?.goal}
                </Descriptions.Item>
                <Descriptions.Item label="Motivo">
                  {item?.notification?.reason}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </List.Item>
    )}
  />
</WrapperDefault>
}