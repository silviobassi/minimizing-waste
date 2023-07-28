import { useCallback, useState } from 'react';
import { Sector } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { SectorService } from '../../sdk/services';

export default function useSector() {
  const [sector, setSector] = useState<Sector.SectorModel>();

  const [notFound, setNotFound] = useState<boolean>(false);

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

  const removeSector = async (sectorId: number) => {
    return await SectorService.deleteExistingSector(sectorId);
  };

  return {
    fetchSector,
    removeSector,
    sector,
    notFound,
  };
}
