import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Permission } from '../../sdk';
import { PermissionService } from '../../sdk/services';
import { AppDispatch, RootState } from '../store';
import * as PermissionActions from '../store/Permission.slice';

export default function usePermissions() {
  const [permissions, setPermissions] =
    useState<Permission.CollectionDetailedModel>([]);

  const dispatch = useDispatch<AppDispatch>();

  const permissionsNotOrGranted = useSelector(
    (state: RootState) => state.permissionsNotOrGranted.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.permissionsNotOrGranted.fetching,
  );

  const fetchPermissions = useCallback(async () => {
    return await PermissionService.getAllPermissions({}).then(setPermissions);
  }, []);

  const fetchPermissionsAllNotOrGranted = useCallback(
    async (roleId: number, permissionParam: string) => {
      return await dispatch(
        PermissionActions.getAllPermissionsNotOrGranted({
          roleId,
          permissionParam,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchPermissions,
    fetchPermissionsAllNotOrGranted,
    permissions,
    permissionsNotOrGranted,
  };
}
