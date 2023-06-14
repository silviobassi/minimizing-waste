import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import usePageTitle from '../../core/usePageTitle';
import { UserService } from '../../sdk';
import { User } from '../../sdk/@types';
import EmployeeForm from '../features/EmployeeForm';

export default function EmployeeEditView() {
  usePageTitle('Edição de Colaborador');
  const params = useParams<{userId: string}>()
  const {user, fetchUser} = useUser()

  useEffect(()=>{
    if(!isNaN(Number(params.userId)))
      fetchUser(Number(params.userId))
  }, [fetchUser, params.userId])

  if(isNaN(Number(params.userId)))
    return <Navigate to={"/colaboradores"} />

function handleUserUpdate(user: User.UpdateInput){
  UserService.updateExistingUser(Number(params.userId), user).then(() => {
    notification.success({
      message: 'Usuário atualizado com sucesso.'
    })
  })
}

  if(!user) return <Skeleton />

  return (
    <EmployeeForm
      user={user}
      onUpdate={handleUserUpdate}
      isCurrentUser={true}
      title="Edição de Colaborador"
      labelRegister="CRIAR"
      iconButton={{ register: <SaveOutlined />, cancel: <StopOutlined /> }}
    />
  );
}
