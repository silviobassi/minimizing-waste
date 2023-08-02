import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import usePageTitle from '../../core/usePageTitle';
import TaskDetailed from '../features/TaskDetailed';
import AccessDenied from '../components/AccessDenied';
import { Card, Skeleton } from 'antd';
import useUsersAssignments from '../../core/hooks/useUsersAssignment';

export default function TaskDetailedView() {
  usePageTitle('Detalhes da tarefa');

  const params = useParams<{ assignmentId: string }>();
  const { assignment, fetchAssignment, notFound } = useUsersAssignments();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    if (!isNaN(Number(params.assignmentId))) {
      fetchAssignment(Number(params.assignmentId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
    }

  }, [
    fetchAssignment,
    params.assignmentId,
  ]);

  if (accessDeniedError) return <AccessDenied />;

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;

  if (!assignment) return <Skeleton />;

  return <TaskDetailed assignment={assignment} />;
}
