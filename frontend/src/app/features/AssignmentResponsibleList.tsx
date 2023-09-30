import { CloseOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Row,
  Tag,
  Typography,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useAssignments from '../../core/hooks/useAssignments';
import { Assignment } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function AssignmentResponsibleList() {
  const { assignments, fetchAssignments, fetching } = useAssignments();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const [responsibleName, setResponsibleName] = useState<string>('');
  const [responsibleCpf, setResponsibleCpf] = useState<string>('');

  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(0);

  const { xs, md, sm } = useBreakpoint();

  useEffect(() => {
    fetchAssignments({
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
  }, [fetchAssignments, responsibleName, responsibleCpf, page]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return (
    <WrapperDefault title="Pesquisa de Tarefas por Responsável">
      <Form layout="vertical" form={form}>
        <Row gutter={20}>
          <Col xs={24} lg={10}>
            <Form.Item label="Pesquisar por nome" name={'responsibleName'}>
              <Input
               placeholder="e.g.: Marcelo Ramos de ..."
                size="large"
                onChange={(e: any) => {
                  setResponsibleName(e.target.value);
                }}
                addonAfter={
                  <CloseOutlined
                    onClick={() => {
                      setResponsibleName('');
                      form.setFieldValue('responsibleName', '');
                    }}
                  />
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={10}>
            <Form.Item label="Pesquisar por CPF" name={'responsibleCpf'}>
              <Input
                placeholder="e.g.: 9876543213"
                size="large"
                onChange={(e: any) => {
                  setResponsibleCpf(e.target.value);
                }}
                addonAfter={
                  <CloseOutlined
                    onClick={() => {
                      setResponsibleCpf('');
                      form.setFieldValue('responsibleCpf', '');
                    }}
                  />
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <List
      key={'id'}
        style={{ width: '100%' }}
        loading={fetching}
        //@ts-ignore
        dataSource={assignments?._embedded?.assignments}
        pagination={{
          onChange: (page: number) => setPage(page - 1),
          //@ts-ignore
          total: assignments?.page?.totalElements,
          pageSize: 2,
        }}
        renderItem={(assignment: Assignment.AssignmentModel, index) => (
          <List.Item key={index} style={{ padding: 0 }}>
            <Row justify={'space-between'} align={'top'} gutter={30}>
              <Col xs={24} lg={12}>
                <Divider orientation="left"  style={{ color: '#0012FF', textAlign: 'justify' }}>
                  DESCRIÇÃO DA TAREFA: {xs || sm ? <br></br> : ''}
                  <Typography.Text>
                    {assignment?.title?.toUpperCase()}
                  </Typography.Text>
                </Divider>
                <Card
                  style={{
                    backgroundColor: '#f2f7fc',
                  }}
                >
                  <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Código">
                      {assignment?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ponto Específico da Tarefa">
                      {assignment?.specificPoint}
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Início">
                      {moment(assignment?.startDate).format('DD/MM/YYYY HH:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Prazo para Conclusão">
                      {moment(assignment?.deadline).format('DD/MM/YYYY HH:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Finalização">
                      {moment(assignment?.endDate).format('DD/MM/YYYY HH:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Estado de Finalização">
                      {assignment?.completed ? (
                        <Tag color="blue">FINALIZADA</Tag>
                      ) : (
                        <Tag color="red">PENDENTE</Tag>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Estado de Aprovação">
                      {assignment?.approved ? (
                        <Tag color="blue">APROVADA</Tag>
                      ) : (
                        <Tag color="red">PENDENTE</Tag>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Natureza da Tarefa">
                      {assignment?.nature}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Divider orientation="left" style={md ? {marginTop: '41px'} : {marginTop: 0} }>
                  
                  DESCRIÇÃO DO LOCAL DA TAREFA
                </Divider>
                <Card
                  style={{
                    backgroundColor: '#f2f7fc',
                  }}
                >
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="Estação de Trabalho">
                      {assignment?.workStation?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Localização">
                      {assignment?.workStation?.localization}
                    </Descriptions.Item>
                    <Descriptions.Item label="Setor">
                      {assignment?.workStation?.sector?.name}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24}>
                <Divider orientation="left">
                  DESCRIÇÃO DO FOCO{xs ?<br></br> : ''} E MOTIVO DA TAREFA
                </Divider>
                <Card
                  style={{
                    backgroundColor: '#f2f7fc',
                  }}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Título">
                      {assignment?.notification?.title}
                    </Descriptions.Item>
                    <Descriptions.Item label="Objetivo">
                      {assignment?.notification?.goal}
                    </Descriptions.Item>
                    <Descriptions.Item label="Motivo">
                      {assignment?.notification?.reason}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </WrapperDefault>
  );
}
