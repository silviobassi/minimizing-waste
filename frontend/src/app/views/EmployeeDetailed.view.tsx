import { Card, Skeleton } from 'antd';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import EmployeeDetailed from '../features/EmployeeDetailed';

export default function EmployeeDetailedView() {
  usePageTitle('Detalhes do Colaborador');

  const params = useParams<{ employeeId: string }>();

  const { user, fetchUser, notFound } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.employeeId))) fetchUser(Number(params.employeeId));
  }, [fetchUser, params.employeeId]);

  if (isNaN(Number(params.employeeId)))
    return <Navigate to={'/colaboradores'} />;

  if (notFound) return <Card>usuário não encontrado</Card>;

  if (!user) return <Skeleton />;

  return <EmployeeDetailed employee={user} />;
}
