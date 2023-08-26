import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import * as RoleActions from '../store/Role.slice';

export default function useRole() {
  const dispatch = useDispatch<AppDispatch>();

  const grantingRole = useCallback(
    async (userId: number, roleId: number) => {
      return await dispatch(
        RoleActions.associateRoleToUser({ userId, roleId }),
      ).unwrap();
    },
    [dispatch],
  );

  const revokingRoles = useCallback(
    async (userId: number, roleId: number) => {
      return await dispatch(
        RoleActions.disassociateRoleToUser({ userId, roleId }),
      ).unwrap();
    },
    [dispatch],
  );

  return { grantingRole, revokingRoles };
}
