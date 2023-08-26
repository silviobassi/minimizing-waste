import { Skeleton, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import usePageTitle from '../../core/usePageTitle';
import { Role } from '../../sdk/@types';
import { RoleService } from '../../sdk/services';
import AccessDenied from '../components/AccessDenied';
import ElementNotFound from '../components/ElementNotFound';
import AccessProfileForm from '../features/AccessProfileForm';
import useAccessProfile from '../../core/hooks/useAccessProfile';

export default function AccessProfileEditView() {
  usePageTitle('Edição de Colaborador');
  const params = useParams<{ roleId: string }>();
  const { role, fetchRole, notFound } = useAccessProfile();
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);

  useEffect(() => {
    if (params.roleId && !isNaN(Number(params.roleId)))
      fetchRole(Number(params.roleId)).catch((err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });

  }, [fetchRole, params.roleId]);

  if (isNaN(Number(params.roleId)))
    return <Navigate to={'/perfis-de-acesso'} />;

  if (notFound)
    return (
      <ElementNotFound description="O Perfil de Acesso não foi encontrado!" />
    );

  if (accessDeniedError)
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  function handleUserUpdate(role: Role.Input) {
    RoleService.updateExistingRole(Number(params.roleId), role).then(() => {
      notification.success({
        message: `Colaborador ${role?.name} atualizado com sucesso.`,
      });
    });
  }

  if (!role) return <Skeleton />;

  return (
    <AccessProfileForm
      role={role}
      onUpdate={handleUserUpdate}
    />
  );
}
