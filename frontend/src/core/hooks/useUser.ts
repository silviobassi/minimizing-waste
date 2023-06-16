import { useCallback, useState } from 'react';
import { User } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { UserService } from '../../sdk/services';

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();
  const [notFound, setNotFound] = useState(false);

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

  return {
    user,
    fetchUser,
    notFound,
  };
}
