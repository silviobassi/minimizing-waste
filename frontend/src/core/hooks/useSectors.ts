import { useCallback, useState } from 'react';
import { Sector } from '../../sdk/@types';
import { SectorService } from '../../sdk/services';

export default function useSectors() {
  const [sectors, setSectors] = useState<Sector.Collection[]>([]);

  const fetchSectors = useCallback(() => {
    SectorService.getAllSectors().then(setSectors);
  }, []);

  return {
    fetchSectors,
    sectors,
  };
}
