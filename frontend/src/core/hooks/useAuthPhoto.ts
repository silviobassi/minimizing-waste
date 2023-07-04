import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as AuthPhotoActions from '../store/AuthPhoto.slice';

export default function useAuthPhoto() {
  const dispatch = useDispatch<AppDispatch>();
  const photo = useSelector((s: RootState) => s.authPhoto.photo);
  const fetching = useSelector((s: RootState) => s.authPhoto.photo);

  const fetchUserPhoto = useCallback(
    (userId: number) => {
      return dispatch(AuthPhotoActions.fetchUserPhoto(userId)).unwrap();
    },
    [dispatch],
  );

  return {
    photo,
    fetching,
    fetchUserPhoto,
  };
}
