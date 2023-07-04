import { useCallback, useState } from 'react';
import { Sector } from '../../sdk/@types';
import { SectorService } from '../../sdk/services';
import { AccessDeniedError } from '../../sdk/errors';

export default function useSectors() {
  const [sectors, setSectors] = useState<Sector.Collection[]>([]);
  const [accessDeniedError, setAccessDeniedError] = useState(false)

  const fetchSectors = useCallback(() => {
   
      SectorService.getAllSectors().then(setSectors).catch(err => {
        if(err instanceof AccessDeniedError){
          setAccessDeniedError(true)
          return 
        }

        throw err
      });
    
  }, []);

  return {
    fetchSectors,
    sectors,
    accessDeniedError
  };
}
