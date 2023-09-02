import { SelectProps, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../../core/hooks/useRole';
import useRoles from '../../core/hooks/useRoles';
import useUsers from '../../core/hooks/useUsers';
import usePageTitle from '../../core/usePageTitle';
import { Role, User } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import GrantForm from '../features/GrantForm';

export default function RevokeRoleView() {
  usePageTitle('Revogação de Roles');
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const { fetchRolesAllNotOrGranted, rolesNotOrGranted } = useRoles();
  const { allUsersSummary, fetchUsersSummary } = useUsers();
  const { revokingRoles } = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsersSummary().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchUsersSummary, fetchRolesAllNotOrGranted, revokingRoles]);

  if (accessDeniedError)
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  const onfetchPermissionsAllNotOrGranted = function (userId: number) {
    fetchRolesAllNotOrGranted(userId, 'granted');
  };

  const optionsAllNotGranted: SelectProps['options'] = [];

  rolesNotOrGranted?._embedded?.roles.map((role: Role.Summary) => {
    return optionsAllNotGranted.push({
      label: role.name.toUpperCase(),
      value: role.id,
    });
  });

  function fetchOptions() {
    const options: User.Summary = [];
    //@ts-ignore
    allUsersSummary?._embedded?.users.map((user: User.SummaryNameModel) => {
      options.push({
        label: user.name,
        value: user.id,
      });
    });
    return options;
  }

  async function revokeRoles(userId: number, roleId: number, role: string) {
    if (isNaN(Number(userId)) || isNaN(Number(roleId))) {
      return notification.error({
        message: 'Informe o usuário ou a role para a revogação',
      });
    }
    await revokingRoles(userId, roleId).then((res: any) => {
      notification.success({
        message: 'Sucesso',
        description: `Role ${role} revogada com sucesso`,
      }),
        navigate('/perfis-de-acesso');
    });
  }
  return (
    <GrantForm
      title="Revogação de Roles"
      isNotGranted={false}
      optionsAllNotOrGranted={optionsAllNotGranted}
      optionsRoleOrUser={fetchOptions()}
      onPermissionsNotOrGranted={onfetchPermissionsAllNotOrGranted}
      onGrantingPermissions={revokeRoles}
      profile="REVOKE_ROLE"
    />
  );
}
