import { useCallback, useState } from 'react';
import { User } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { UserService } from '../../sdk/services';

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();
  const [notFound, setNotFound] = useState(false);
  const [entityInUse, setEntityInUse] = useState(false);

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

  const removeUser = async (userId: number) => {
    await UserService.deleteExistingUser(userId);
  };

  return {
    user,
    fetchUser,
    removeUser,
    notFound,
  };
}
