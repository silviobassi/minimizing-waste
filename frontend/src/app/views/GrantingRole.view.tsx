import { SelectProps, notification } from 'antd';
import { useEffect, useState } from 'react';
import useRole from '../../core/hooks/useRole';
import useRoles from '../../core/hooks/useRoles';
import useUsers from '../../core/hooks/useUsers';
import usePageTitle from '../../core/usePageTitle';
import { Role, User } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import GrantingPermissionsForm from '../features/GrantingPermissionsForm';

export default function RevokeRoleView() {
  usePageTitle('Concessão de Roles');
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const { fetchRolesAllNotOrGranted, rolesNotOrGranted } = useRoles();
  const { allUsersSummary, fetchUsersSummary } = useUsers();
  const { grantingRole } = useRole();

  useEffect(() => {
    fetchUsersSummary().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchUsersSummary, fetchRolesAllNotOrGranted, grantingRole]);

  if (accessDeniedError)
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  const onfetchPermissionsAllNotOrGranted = function (userId: number) {
    fetchRolesAllNotOrGranted(userId, 'notGranted');
  };

  const optionsAllNotGranted: SelectProps['options'] = [];

  rolesNotOrGranted?._embedded?.roles.map((role: Role.Summary) => {
    return optionsAllNotGranted.push({
      label: role.name.toUpperCase(),
      value: role.id,
    });
  });

  function fetchOptions() {
    const options: Role.CollectionDetailed = [];
    allUsersSummary?._embedded?.users.map((user: User.SummaryNameModel) => {
      options.push({
        label: user.name,
        value: user.id,
      });
    });
    return options;
  }

  function grantRoles(userId: number, roleId: number, role: string) {
    if (isNaN(Number(userId)) || isNaN(Number(roleId))) {
      return notification.error({
        message: 'Informe o usuário ou a role para a concessão',
      });
    }
    grantingRole(userId, roleId).then((res: any) =>
      notification.success({
        message: 'Sucesso',
        description: `Role ${role} concedida com sucesso`,
      }),
    );
  }
  return (
    <GrantingPermissionsForm
      title="Concessão de Roles"
      isNotGranted={true}
      optionsAllNotOrGranted={optionsAllNotGranted}
      optionsRole={fetchOptions()}
      onPermissionsNotOrGranted={onfetchPermissionsAllNotOrGranted}
      onGrantingPermissions={grantRoles}
      profile='GRANT_ROLE'
    />
  );
}
