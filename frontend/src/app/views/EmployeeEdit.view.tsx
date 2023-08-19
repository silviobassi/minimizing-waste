import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import { UserService } from '../../sdk';
import { User } from '../../sdk/@types';
import ElementNotFound from '../components/ElementNotFound';
import EmployeeForm from '../features/EmployeeForm';
import AccessDenied from '../components/AccessDenied';

export default function EmployeeEditView() {
  usePageTitle('Edição de Colaborador');
  const params = useParams<{ userId: string }>();
  const { user, fetchUser, notFound } = useUser();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  useEffect(() => {
    if (params.userId && !isNaN(Number(params.userId)))
      fetchUser(Number(params.userId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, [fetchUser, params.userId]);

  if (isNaN(Number(params.userId))) return <Navigate to={'/colaboradores'} />;

  if (notFound)
    return <ElementNotFound description="O Colaborador não foi encontrado!" />;

  if (accessDeniedError) return <AccessDenied />;

  function handleUserUpdate(user: User.UpdateInput) {
    UserService.updateExistingUser(Number(params.userId), user).then(() => {
      notification.success({
        message: `Colaborador ${user?.name} atualizado com sucesso.`,
      });
    });
  }

  if (!user) return <Skeleton />;

  return (
    <EmployeeForm
      user={user}
      onUpdate={handleUserUpdate}
      isCurrentUser={true}
      title="Edição de Colaborador"
      labelRegister="EDITAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
