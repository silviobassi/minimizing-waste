import { Card, Skeleton, notification } from 'antd';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUsersAssignments from '../../core/hooks/useUsersAssignment';
import usePageTitle from '../../core/usePageTitle';
import { Assignment } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import AssignmentAssigned from '../features/AssignmentAssigned';

export default function TaskUnassignView() {
  usePageTitle('Desatribuição de Tarefas');

  const params = useParams<{ assignmentId: string }>();

  const {
    fetchAssignment,
    fetchUserAssignmentsAssigned,
    disassociateEmployee,
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

    fetchUserAssignmentsAssigned(page, true, Number(params.assignmentId)).catch(
      (err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      },
    );
  }, [
    fetchAssignment,
    params.assignmentId,
    fetchUserAssignmentsAssigned,
    page,
  ]);

  function handleAssignmentUnassign(
    notice: Assignment.AssignmentNotificationInput,
    employeeId: number,
    employeeName: string,
  ) {
    disassociateEmployee(
      notice,
      Number(params.assignmentId),
      employeeId,
      page,
    ).then((res) => {
      notification.success({
        message: 'Sucesso',
        description: `Colaborador ${employeeName}
          desatribuído com sucesso`,
      });
    });
  }

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;
  if (accessDeniedError) return <AccessDenied />;

  if (!assignment) return <Skeleton />;

  return (
    <AssignmentAssigned
      users={usersAssignmentAssign}
      assignment={assignment}
      onAssigned={handleAssignmentUnassign}
      onPage={(page: number) => setPage(page - 1)}
      assign={false}
    />
  );
}
