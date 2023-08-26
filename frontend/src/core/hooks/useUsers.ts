import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, UserService } from '../../sdk';
import { AppDispatch, RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const [allUsersSummary, setAllUsersSummary] = useState<
    User.SummaryNameModel[]
  >([]);
  const users = useSelector((state: RootState) => state.user.list);
  const fetching = useSelector((state: RootState) => state.user.fetching);

  const fetchUsers = useCallback(
    async (page?: number, size?: number) => {
      return dispatch(UserActions.getAllUsers({ page, size })).unwrap();
    },
    [dispatch],
  );

  const fetchUsersSummary = useCallback(async () => {
    await UserService.getAllUsersSummary().then(setAllUsersSummary);
  }, []);

  return {
    fetchUsers,
    fetchUsersSummary,
    users,
    allUsersSummary,
    fetching,
  };
}
