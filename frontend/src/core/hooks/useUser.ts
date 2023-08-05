import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { UserService } from '../../sdk/services';
import { AppDispatch } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = useCallback(async (userId: number) => {
    try {
      await UserService.getDetailedUser(userId).then(setUser);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  const removeUser = useCallback(
    async (userId: number) => {
      return await dispatch(UserActions.removeUser(userId)).unwrap();
    },
    [dispatch],
  );

  return {
    user,
    fetchUser,
    removeUser,
    notFound,
  };
}
