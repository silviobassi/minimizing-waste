import { useCallback, useState } from 'react';
import { Sector } from '../../@types/Sector';
import SectorService from '../../services/Sector.service';

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
