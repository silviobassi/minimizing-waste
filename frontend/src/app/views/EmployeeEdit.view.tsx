import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import { UserService } from '../../sdk';
import { User } from '../../sdk/@types';
import { FileService } from '../../sdk/services';
import ElementNotFound from '../components/ElementNotFound';
import EmployeeForm from '../features/EmployeeForm';

export default function EmployeeEditView() {
  usePageTitle('Edição de Colaborador');
  const params = useParams<{ userId: string }>();
  const { user, fetchUser, notFound } = useUser();

  useEffect(() => {
    if (params.userId && !isNaN(Number(params.userId)))
      fetchUser(Number(params.userId));
  }, [fetchUser, params.userId]);

  if (isNaN(Number(params.userId))) return <Navigate to={'/colaboradores'} />;

  if (notFound)
    return <ElementNotFound description="O Colaborador não foi encontrado!" />;

  function handleUserUpdate(user: User.UpdateInput, file: RcFile) {
    FileService.updatePhoto(file, Number(params.userId));
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
