import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.user.list);
  const fetching = useSelector((state: RootState) => state.user.fetching);

  const fetchUsers = useCallback(
    async (page?: number, size?: number) => {
      return dispatch(UserActions.getAllUsers({ page, size })).unwrap();
    },
    [dispatch],
  );

  return {
    fetchUsers,
    users,
    fetching,
  };
}
