import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Card, Skeleton, notification } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import useUserPhoto from '../../core/hooks/useUserPhoto';
import usePageTitle from '../../core/usePageTitle';
import { UserService } from '../../sdk';
import { User } from '../../sdk/@types';
import { FileService } from '../../sdk/services';
import EmployeeForm from '../features/EmployeeForm';

export default function EmployeeEditView() {
  usePageTitle('Edição de Colaborador');
  const params = useParams<{ userId: string }>();
  const { user, fetchUser, notFound } = useUser();
  const { userPhoto, fetchUserPhoto } = useUserPhoto();

  useEffect(() => {
    if (params.userId && !isNaN(Number(params.userId)))
      fetchUser(Number(params.userId));
    fetchUserPhoto(Number(params.userId));
  }, [fetchUser, fetchUserPhoto, params.userId]);

  if (isNaN(Number(params.userId))) return <Navigate to={'/colaboradores'} />;

  if (notFound) return <Card>usuário não encontrado</Card>;

  function handleUserUpdate(user: User.UpdateInput, file: RcFile) {
    FileService.updatePhoto(file, Number(params.userId));
    UserService.updateExistingUser(Number(params.userId), user).then(() => {
      notification.success({
        message: 'Usuário atualizado com sucesso.',
      });
    });
  }

  if (!user) return <Skeleton />;

  return (
    <EmployeeForm
      user={user}
      avatarUrl={userPhoto?.avatarUrl}
      onUpdate={handleUserUpdate}
      isCurrentUser={true}
      title="Edição de Colaborador"
      labelRegister="EDITAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
