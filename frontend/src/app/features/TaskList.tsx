import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Space, Table, Tooltip } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAssignments from '../../core/hooks/useAssignments';
import { Assignment } from '../../sdk/@types';

import AccessDenied from '../components/AccessDenied';
import WrapperDefault from '../components/WrapperDefault';

export default function TaskList() {
  const navigate = useNavigate();
  const { assignments, fetchAssignments, accessDeniedError } = useAssignments();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

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
            render(completed) {
              return <Checkbox checked={completed}>FINALIZADA</Checkbox>;
            },
          },
          {
            title: 'Verificação',
            dataIndex: 'approved',
            align: 'center',
            render(approved: boolean) {
              return <Checkbox checked={approved}>APROVADA</Checkbox>;
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
                <Tooltip title={'Excluir'}>
                  <Button type={'link'} icon={<DeleteOutlined />} />
                </Tooltip>
                <Tooltip title={'Atribuir Tarefa'}>
                  <Button
                    type={'link'}
                    icon={<ReconciliationOutlined />}
                    onClick={() =>
                      navigate(`/tarefa/${assignment.id}/atribuicao`)
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
          pageSize: 5,
        }}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
