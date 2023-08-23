import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as RoleActions from '../store/AccessProfile.slice';

export default function useAccessProfiles() {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: RootState) => state.roles.list);
  const fetching = useSelector((state: RootState) => state.roles.fetching);

  const fetchRoles= useCallback(
    async () => {
      return dispatch(RoleActions.getAllRoles(0)).unwrap();
    },
    [dispatch],
  );

  return {
    fetchRoles,
    roles,
    fetching,
  };
}
