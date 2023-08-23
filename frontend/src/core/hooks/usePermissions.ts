import { useCallback, useState } from 'react';
import { Permission } from '../../sdk';
import { PermissionService } from '../../sdk/services';

export default function usePermissions() {
  const [permissions, setPermissions] =
    useState<Permission.CollectionDetailedModel>([]);

  const [permissionsNotGranted, setPermissionsNotGranted] =
    useState<Permission.CollectionDetailedModel>([]);

  const fetchPermissions = useCallback(async () => {
    return await PermissionService.getAllPermissions().then(setPermissions);
  }, []);

  const fetchPermissionsAllNotGranted = useCallback(async (roleId: number) => {
    return await PermissionService.getAllPermissionsAllNotGranted(roleId).then(
      setPermissionsNotGranted,
    );
  }, []);

  return {
    fetchPermissions,
    fetchPermissionsAllNotGranted,
    permissions,
    permissionsNotGranted,
  };
}
