import { useEffect, useState } from 'react';
import useAccessProfiles from '../../core/hooks/useAccessProfiles';
import usePageTitle from '../../core/usePageTitle';
import { Permission, Role } from '../../sdk';

import { notification, type SelectProps } from 'antd';
import usePermission from '../../core/hooks/usePermission';
import usePermissions from '../../core/hooks/usePermissions';
import AccessDenied from '../components/AccessDenied';
import GrantingPermissionsForm from '../features/GrantingPermissionsForm';

export default function GrantingPermissionsView() {
  usePageTitle('Concessão de Permissões');
  const [accessDeniedError, setAccessDeniedError] = useState<boolean>(false);
  const { fetchRoles, roles } = useAccessProfiles();
  const { permissionsNotOrGranted, fetchPermissionsAllNotOrGranted } =
    usePermissions();
  const { grantingPermissions } = usePermission();

  useEffect(() => {
    fetchRoles().catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchRoles, fetchPermissionsAllNotOrGranted, grantingPermissions]);

  if (accessDeniedError)
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  const onfetchPermissionsAllNotOrGranted = function (roleId: number) {
    fetchPermissionsAllNotOrGranted(roleId, 'notGranted');
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

  function grantPermissions(
    roleId: number,
    permissionId: number,
    permission: string,
  ) {
    if (isNaN(Number(roleId)) || isNaN(Number(permissionId))) {
      return notification.error({
        message: 'Informe o perfil de acesso ou a permissão para a concessão',
      });
    }
    grantingPermissions(roleId, permissionId).then((res: any) =>
      notification.success({
        message: 'Sucesso',
        description: `Permissão ${permission} concedida com sucesso`,
      }),
    );
  }
  return (
    <GrantingPermissionsForm
      title="Concessão de Permissões"
      isNotGranted={true}
      optionsAllNotOrGranted={optionsAllNotGranted}
      optionsRole={fetchOptions()}
      onPermissionsNotOrGranted={onfetchPermissionsAllNotOrGranted}
      onGrantingPermissions={grantPermissions}
      profile='GRANT_PERMISSIONS'
    />
  );
}
