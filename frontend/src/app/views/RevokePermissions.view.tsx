import { useEffect, useState } from 'react';
import useAccessProfiles from '../../core/hooks/useAccessProfiles';
import usePageTitle from '../../core/usePageTitle';
import { Permission, Role } from '../../sdk';

import { notification, type SelectProps } from 'antd';
import usePermission from '../../core/hooks/usePermission';
import usePermissions from '../../core/hooks/usePermissions';
import AccessDenied from '../components/AccessDenied';
import GrantForm from '../features/GrantForm';

export default function RevokePermissionsView() {
  usePageTitle('Revogação de Permissões');
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const { fetchRoles, roles } = useAccessProfiles();
  const { permissionsNotOrGranted, fetchPermissionsAllNotOrGranted } =
    usePermissions();
  const { revokingPermissions } = usePermission();

  useEffect(() => {
    fetchRoles().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchRoles, fetchPermissionsAllNotOrGranted, revokingPermissions]);

  if (accessDeniedError)
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  const onfetchPermissionsAllNotOrGranted = function (roleId: number) {
    fetchPermissionsAllNotOrGranted(roleId, 'granted');
  };

  const optionsAllNotGranted: SelectProps['options'] = [];

  permissionsNotOrGranted?._embedded?.permissions.map(
    (permission: Permission.DetailedModel) => {
      return optionsAllNotGranted.push({
        label: permission.description.toUpperCase(),
        value: permission.id,
      });
    },
  );

  function fetchOptions() {
    const options: Role.CollectionDetailed = [];
    roles?._embedded?.roles.map((role: Role.Detailed) => {
      options.push({
        label: role.name,
        value: role.id,
      });
    });
    return options;
  }

  function revokePermissions(
    roleId: number,
    permissionId: number,
    permission: string,
  ) {
    if (isNaN(Number(roleId)) || isNaN(Number(permissionId))) {
      return notification.error({
        message: 'Informe o perfil de acesso ou a permissão para a revogação',
      });
    }
    revokingPermissions(roleId, permissionId).then((res: any) =>
      notification.success({
        message: 'Sucesso',
        description: `Permissão ${permission} revogada com sucesso`,
      }),
    );
  }
  return (
    <GrantForm
      title="Revogação de Permissões"
      isNotGranted={false}
      optionsAllNotOrGranted={optionsAllNotGranted}
      optionsRoleOrUser={fetchOptions()}
      onPermissionsNotOrGranted={onfetchPermissionsAllNotOrGranted}
      onGrantingPermissions={revokePermissions}
      profile="REVOKE_PERMISSIONS"
    />
  );
}
