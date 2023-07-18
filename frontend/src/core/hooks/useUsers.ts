import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, UserService } from '../../sdk';
import { AppDispatch, RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const [usersAssignmentsAssigned, setUsersAssignmentsAssigned] = useState<
    User.PagedModelUserAssigned[]
  >([]);

  const users = useSelector((state: RootState) => state.user.list);
  const fetching = useSelector((state: RootState) => state.user.fetching);

  const fetchUsers = useCallback(
    async (page: number) => {
      return dispatch(UserActions.getAllUsers(page)).unwrap();
    },
    [dispatch],
  );

  const fetchUserAssignmentsAssigned = useCallback(
    async (page: number, assigned: boolean, assignmentId: number) => {
      UserService.getAllUsersAssigned(page, assigned, assignmentId).then(
        setUsersAssignmentsAssigned,
      );
    },
    [],
  );

  return {
    fetchUsers,
    users,
    fetching,
    fetchUserAssignmentsAssigned,
    usersAssignmentsAssigned,
  };
}
