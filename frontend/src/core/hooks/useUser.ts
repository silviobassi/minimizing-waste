import { useCallback, useState } from 'react';
import { User } from '../../sdk/@types';
import { EntityInUseError, ResourceNotFoundError } from '../../sdk/errors';
import { UserService } from '../../sdk/services';
import { notification } from 'antd';

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();
  const [notFound, setNotFound] = useState(false);
  const [entityInUse, setEntityInuse] = useState(false);

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
    try {
      await UserService.deleteExistingUser(userId);
    } catch (error) {
      if (error instanceof EntityInUseError) {
        setEntityInuse(true);
      } else {
        throw error;
      }
    }
  };

  return {
    user,
    fetchUser,
    removeUser,
    notFound,
    entityInUse,
  };
}
