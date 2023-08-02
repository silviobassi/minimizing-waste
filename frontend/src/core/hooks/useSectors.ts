import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccessDeniedError } from '../../sdk/errors';
import { AppDispatch, RootState } from '../store';
import * as SectorActions from '../store/Sector.slice';

export default function useSectors() {
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const sectors = useSelector((state: RootState) => state.sectors.list);
  const fetching = useSelector((state: RootState) => state.sectors.fetching);

  const fetchSectors = useCallback(
    async (page: number) => {
      return dispatch(SectorActions.getAllSectors(page))
        .unwrap()
        .catch((err) => {
          if (err instanceof AccessDeniedError) {
            setAccessDeniedError(true);
            return;
          }

          throw err;
        });
    },
    [dispatch],
  );

  return {
    fetchSectors,
    sectors,
    accessDeniedError,
    fetching,
  };
}
