import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import * as PermissionActions from '../store/Permission.slice';

export default function usePermission() {
  const dispatch = useDispatch<AppDispatch>();

  const grantingPermissions = useCallback(
    async (roleId: number, permissionId: number) => {
      return await dispatch(
        PermissionActions.associatePermissionsToRole({ roleId, permissionId }),
      ).unwrap();
    },
    [dispatch],
  );

  const revokingPermissions = useCallback(
    async (roleId: number, permissionId: number) => {
      return await dispatch(
        PermissionActions.disassociatePermissionsToRole({
          roleId,
          permissionId,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  return { grantingPermissions, revokingPermissions };
}
