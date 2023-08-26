import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as RoleActions from '../store/Role.slice';

export default function useRoles() {
  const dispatch = useDispatch<AppDispatch>();

  const rolesNotOrGranted = useSelector(
    (state: RootState) => state.rolesNotOrGranted.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.rolesNotOrGranted.fetching,
  );

  const fetchRolesAllNotOrGranted = useCallback(
    async (userId: number, roleParam: string) => {
      return await dispatch(
        RoleActions.getAllRolesNotOrGranted({
          userId,
          roleParam,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    rolesNotOrGranted,
    fetching,
    fetchRolesAllNotOrGranted,
  };
}
