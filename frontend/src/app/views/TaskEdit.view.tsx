import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUsersAssignments from '../../core/hooks/useUsersAssignment';
import usePageTitle from '../../core/usePageTitle';
import { Assignment, AssignmentService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import TaskForm from '../features/TaskForm';

export default function TaskEditView() {
  usePageTitle('Edição de Tarefa');

  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  const params = useParams<{ assignmentId: string }>();
  const { assignment, fetchAssignment, notFound } = useUsersAssignments();

  useEffect(() => {
    if (params.assignmentId && !isNaN(Number(params.assignmentId)))
      fetchAssignment(Number(params.assignmentId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
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

  if (notFound)
    return <ElementNotFound description="A Tarefa não foi encontrada!" />;

  if (accessDeniedError) return <AccessDenied />;

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
      labelRegister="EDITAR"
      iconButton={{
        register: <EditOutlined />,
        cancel: <StopOutlined />,
      }}
      title="Edição de Tarefa"
      onUpdate={handleAssignmentUpdate}
      assignment={transformAssignmentData(assignment)}
    />
  );
}
