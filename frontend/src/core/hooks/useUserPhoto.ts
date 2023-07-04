import { useCallback, useState } from 'react';
import { User } from '../../sdk';
import { FileService } from '../../sdk/services';

export default function useUserPhoto() {
  const [userPhoto, setUserPhoto] = useState<User.Avatar>();

  const fetchUserPhoto = useCallback(async (userId: number) => {
    await FileService.getUserPhoto(userId).then(setUserPhoto);
  }, []);

  return {
    userPhoto,
    fetchUserPhoto,
  };
}
