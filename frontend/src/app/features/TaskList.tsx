import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAssignments from '../../core/hooks/useAssignments';
import { Assignment } from '../../sdk/@types';

import useAssignment from '../../core/hooks/useAssignment';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskList() {
  const navigate = useNavigate();
  const { assignments, fetchAssignments } = useAssignments();
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { removeAssignment, toggleComplete, toggleApprove } = useAssignment();
  const [page, setPage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    fetchAssignments(page).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchAssignments, page, checked]);

  if (accessDeniedError) return <AccessDenied />;

  return (
    <WrapperDefault title="Lista de Tarefas">
      <Table<Assignment.PagedModelAssignment>
        dataSource={assignments?._embedded?.assignments}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Título', dataIndex: 'title' },
          { title: 'Estação de Trabalho', dataIndex: ['workStation', 'name'] },
          {
            title: 'Data de Início',
            dataIndex: 'startDate',
            align: 'center',
            width: 130,
            render(startDate: string) {
              return format(new Date(startDate), 'dd/MM/yyyy');
            },
          },
          {
            title: 'Prazo Para Conclusão',
            dataIndex: 'deadline',
            align: 'center',
            width: 130,
            render(deadline: string) {
              return format(new Date(deadline), 'dd/MM/yyyy');
            },
          },
          {
            title: 'Data do Término',
            dataIndex: 'endDate',
            align: 'center',
            width: 130,
            render(endDate: string) {
              return format(new Date(endDate), 'dd/MM/yyyy');
            },
          },

          {
            title: 'Finalização',
            dataIndex: 'completed',
            align: 'center',
            render(_: any, assignment) {
              return (
                <Checkbox
                  checked={assignment?.completed}
                  onChange={async () => {
                    await toggleComplete(
                      { completed: !assignment?.completed },
                      assignment.id,
                    );
                  }}
                >
                  {assignment?.completed ? (
                    <Tag color="blue">FINALIZADA</Tag>
                  ) : (
                    <Tag color="red">PENDENTE</Tag>
                  )}
                </Checkbox>
              );
            },
          },
          {
            title: 'Verificação',
            dataIndex: 'approved',
            align: 'center',
            render(_: any, assignment) {
              return (
                <Checkbox
                  checked={assignment?.approved}
                  onChange={async () => {
                    await toggleApprove(
                      { approved: !assignment?.approved },
                      assignment.id,
                    );
                  }}
                >
                  {assignment?.approved ? (
                    <Tag color="blue">APROVADA</Tag>
                  ) : (
                    <Tag color="red">PENDENTE</Tag>
                  )}
                </Checkbox>
              );
            },
          },

          {
            title: 'Ações',
            dataIndex: 'actions',
            align: 'center',
            width: 200,
            render: (_: any, assignment) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button
                    type={'link'}
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/tarefa/editar/${assignment.id}`)}
                  />
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Tarefa?"
                  popConfirmContent="Deseja mesmo remover esta tarefa?"
                  onConfirm={async () => {
                    await removeAssignment(Number(assignment.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Tarefa ${assignment.title}  removida com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button type="link">
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>

                <Tooltip title={'Atribuir Tarefa'}>
                  <Button
                    type={'link'}
                    icon={<ReconciliationOutlined />}
                    onClick={() =>
                      navigate(`/tarefa/${assignment.id}/atribuicao`)
                    }
                  />
                </Tooltip>
                <Tooltip title={'Desatribuir Tarefa'}>
                  <Button
                    type={'link'}
                    icon={<ReconciliationOutlined />}
                    onClick={() =>
                      navigate(`/tarefa/${assignment.id}/desatribuicao`)
                    }
                  />
                </Tooltip>
                <Tooltip title={'Ver Detalhes'}>
                  <Button
                    type={'link'}
                    icon={<EyeOutlined />}
                    onClick={() =>
                      navigate(`/tarefas/${assignment.id}/detalhes`)
                    }
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        pagination={{
          onChange: (page: number) => setPage(page - 1),
          total: assignments?.page?.totalElements,
          pageSize: 4,
        }}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
