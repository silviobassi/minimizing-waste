import { useCallback, useState } from 'react';
import { Permission } from '../../sdk';
import { PermissionService } from '../../sdk/services';

export default function usePermissions() {
  const [permissions, setPermissions] =
    useState<Permission.CollectionDetailedModel>([]);

  const fetchPermissions = useCallback(async () => {
    return PermissionService.getAllPermissions().then(setPermissions);
  }, []);

  return {
    fetchPermissions,
    permissions,
  };
}
