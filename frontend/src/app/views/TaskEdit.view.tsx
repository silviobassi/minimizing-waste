import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Card, Skeleton, notification } from 'antd';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import usePageTitle from '../../core/usePageTitle';
import { Assignment, AssignmentService } from '../../sdk';
import TaskForm from '../features/TaskForm';

export default function TaskEditView() {
  usePageTitle('Edição de Tarefa');

  const params = useParams<{ assignmentId: string }>();
  const { assignment, fetchAssignment, notFound } = useAssignment();

  useEffect(() => {
    if (params.assignmentId && !isNaN(Number(params.assignmentId)))
      fetchAssignment(Number(params.assignmentId));
  }, [fetchAssignment, params.assignmentId]);

  const transformAssignmentData = useCallback(
    (assignment: Assignment.AssignmentModel) => {
      return {
        ...assignment,
        startDate: moment(assignment.startDate),
        deadline: moment(assignment.deadline),
        nature:
          assignment?.nature[0].toUpperCase() +
          assignment?.nature?.substr(1).toLowerCase(),
      };
    },
    [],
  );

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>usuário não encontrado</Card>;

  function handleAssignmentUpdate(assignment: Assignment.AssignmentInput) {
    AssignmentService.updateExistingAssignment(
      assignment,
      Number(params.assignmentId),
    ).then((assignment: Assignment.AssignmentModel) => {
      notification.success({
        message: `Tarefa ${assignment?.title} atualizada com sucesso.`,
      });
    });
  }

  if (!assignment) return <Skeleton />;

  return (
    <TaskForm
      labelRegister="CRIAR"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Tarefa"
      isCurrentAssignment={true}
      onUpdate={handleAssignmentUpdate}
      assignment={transformAssignmentData(assignment)}
    />
  );
}
