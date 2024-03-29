import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sector } from '../../sdk';
import { AppDispatch, RootState } from '../store';
import * as SectorActions from '../store/Sector.slice';

export default function useSectors() {
  const dispatch = useDispatch<AppDispatch>();
  const sectors = useSelector((state: RootState) => state.sectors.list);
  const fetching = useSelector((state: RootState) => state.sectors.fetching);

  const fetchSectors = useCallback(
    async (search: Sector.Query) => {
      return dispatch(SectorActions.getAllSectors(search)).unwrap();
    },
    [dispatch],
  );

  return {
    fetchSectors,
    sectors,
    fetching,
  };
}
