import { Card, Skeleton, notification } from 'antd';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useUsersAssignments from '../../core/hooks/useUsersAssignment';
import usePageTitle from '../../core/usePageTitle';
import AccessDenied from '../components/AccessDenied';
import AssignmentAssigned from '../features/AssignmentAssigned';

export default function TaskAssignView() {
  usePageTitle('Atribuição de Tarefas');

  const params = useParams<{ assignmentId: string }>();
  const {
    fetchAssignment,
    fetchUserAssignmentsAssigned,
    associateEmployee,
    usersAssignmentAssign,
    assignment,
    notFound,
  } = useUsersAssignments();
  const [page, setPage] = useState<number>(0);
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    if (!isNaN(Number(params.assignmentId))) {
      fetchAssignment(Number(params.assignmentId));
    }

    fetchUserAssignmentsAssigned(
      { page, assigned: false },
      Number(params.assignmentId),
    ).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [
    fetchAssignment,
    params.assignmentId,
    fetchUserAssignmentsAssigned,
    page,
  ]);

  function handleAssignmentAssign(employeeId: number, employeeName: string) {
    associateEmployee(Number(params.assignmentId), employeeId, {
      page,
      assigned: false,
      size: 4,
      sort: ['name', 'asc']
    }).then((res) => {
      notification.success({
        message: 'Sucesso',
        description: `Colaborador ${employeeName}
          associado com sucesso`,
      });
    });
  }

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;
  if (accessDeniedError)
    return <AccessDenied>Você não pode executar essa operação!</AccessDenied>;

  if (!assignment) return <Skeleton />;

  return (
    <AssignmentAssigned
      users={usersAssignmentAssign}
      assignment={assignment}
      //@ts-ignore
      onAssigned={handleAssignmentAssign}
      onPage={(page: number) => setPage(page - 1)}
      assign={false}
    />
  );
}
