import { Card, Skeleton, notification } from 'antd';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAssignment from '../../core/hooks/useAssignment';
import useUsers from '../../core/hooks/useUsers';
import usePageTitle from '../../core/usePageTitle';
import { Assignment, AssignmentService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import AssignmentAssigned from '../features/AssignmentAssigned';

export default function TaskUnassignView() {
  usePageTitle('Desatribuição de Tarefas');

  const params = useParams<{ assignmentId: string }>();

  const { assignment, fetchAssignment, notFound } = useAssignment();
  const { usersAssignmentsAssigned, fetchUserAssignmentsAssigned } = useUsers();
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
    AssignmentService.disassociateEmployee(
      notice,
      Number(params.assignmentId),
      Number(employeeId),
    ).then((res) => {
      if (res === 204) {
        notification.success({
          message: 'Sucesso',
          description: `Colaborador ${employeeName}
          desatribuído com sucesso`,
        });
      }
      fetchUserAssignmentsAssigned(page, true, Number(params.assignmentId))
      fetchAssignment(Number(params.assignmentId));
    });

  }

  if (accessDeniedError) return <AccessDenied />;

  if (isNaN(Number(params.assignmentId))) return <Navigate to={'/tarefas'} />;

  if (notFound) return <Card>tarefa não encontrada</Card>;

  if (!assignment) return <Skeleton />;

  return (
    <AssignmentAssigned
      users={usersAssignmentsAssigned}
      assignment={assignment}
      onAssigned={handleAssignmentUnassign}
      onPage={(page: number) => setPage(page - 1)}
      assign={false}
    />
  );
}
