import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Role } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { RoleService } from '../../sdk/services';
import { AppDispatch } from '../store';
import * as RoleActions from '../store/AccessProfile.slice';

export default function useAccessProfile() {
  const [role, setRole] = useState<Role.Detailed>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchRole = useCallback(async (roleId: number) => {
    try {
      await RoleService.getRole(roleId).then(setRole);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  const removeRole = useCallback(
    async (roleId: number) => {
      return await dispatch(RoleActions.removeRoles(roleId)).unwrap();
    },
    [dispatch],
  );

  return {
    fetchRole,
    removeRole,
    role,
    notFound,
  };
}
