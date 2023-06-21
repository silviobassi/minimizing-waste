import { useCallback, useState } from 'react';
import { FileService } from '../../sdk/services';

export default function useUserPhoto() {
  const [userPhoto, setUserPhoto] = useState<void>();

  const fetchUserPhoto = useCallback(async (userId: number) => {
  
      FileService.getUserPhoto(userId).then(setUserPhoto);
 
  }, []);

  return {
    userPhoto,
    fetchUserPhoto,
  };
}
