import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sector } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { SectorService } from '../../sdk/services';
import { AppDispatch } from '../store';
import * as SectorActions from '../store/Sector.slice';

export default function useSector() {
  const [sector, setSector] = useState<Sector.SectorModel>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchSector = useCallback(async (sectorId: number) => {
    try {
      await SectorService.getSector(sectorId).then(setSector);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  const removeSector = useCallback(
    async (sectorId: number) => {
      return await dispatch(SectorActions.removeSector(sectorId)).unwrap();
    },
    [dispatch],
  );


  return {
    fetchSector,
    removeSector,
    sector,
    notFound,
  };
}
