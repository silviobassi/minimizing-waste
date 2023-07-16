import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  List,
  Row,
  Skeleton,
  Space,
  Tag,
} from 'antd';

import { format } from 'date-fns';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import useUsers from '../../core/hooks/useUsers';
import usePageTitle from '../../core/usePageTitle';
import { Assignment, User } from '../../sdk';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';
import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskAssignView() {
  usePageTitle('Atribuição de Tarefas');

  const params = useParams<{ assignmentId: string }>();

  const { assignment, fetchAssignment, notFound } = useAssignment();
  const { users, fetchUsers } = useUsers();
  const [page, setPage] = useState<number>(0);
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    if (!isNaN(Number(params.assignmentId))) {
      fetchAssignment(Number(params.assignmentId));
    }

    fetchUsers(page).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchAssignment, params.assignmentId, fetchUsers, page]);

  if (accessDeniedError) return <AccessDenied />;

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;

  if (!assignment) return <Skeleton />;

  return (
    <WrapperDefault title="Atribuição de Tarefas">
      <Row justify={'space-between'}>
        <Col xs={24} xl={9}>
          <Divider orientation="left">TAREFA A ATRIBUIR</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'Prazo para Conclusão'}>
              <Space direction="horizontal">
                <Tag color="red">
                  {format(new Date(assignment?.deadline), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Tipo da Tarefa'}>
              {assignment?.nature}
            </Descriptions.Item>
            <Descriptions.Item label={'Setor'}>
              {assignment?.workStation?.sector?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Estação de Trabalho'}>
              {assignment?.workStation?.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Responsáveis pela Tarefa</Divider>

          {assignment?.employeesResponsible.map(
            (employeeResponsible: Assignment.AssignmentModel) => (
              <>
                <Tag color="blue">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label={'Nome'}>
                      {employeeResponsible?.name}
                    </Descriptions.Item>

                    <Descriptions.Item label={'Cargo'}>
                      {employeeResponsible?.office}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {employeeResponsible?.occupation}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {phoneToFormat(employeeResponsible?.whatsApp)}
                    </Descriptions.Item>
                  </Descriptions>
                </Tag>
              </>
            ),
          )}
        </Col>
        <Col xs={24} xl={12}>
          <Divider orientation="left">
            COLABORADORES DISPONÍVEIS À ASSOCIAÇÃO
          </Divider>

          <List
            itemLayout="horizontal"
            dataSource={users?._embedded?.users}
            
            renderItem={(user: User.Detailed) => (
              <>
                <List.Item>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label={'Nome'}>
                      {user?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Cargo'}>
                      {user?.office}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Função'}>
                      {user?.occupation}
                    </Descriptions.Item>
                  </Descriptions>
                  <Button type="primary">ASSOCIAR</Button>
                </List.Item>
              </>
            )}
            pagination={{
              onChange: (page: number) => setPage(page - 1),
              total: users?.page?.totalElements,
              pageSize: 4,
            }}
          />
        </Col>
      </Row>
    </WrapperDefault>
  );
}
