import { useCallback, useState } from 'react';
import { WorkStation } from '../../sdk/@types';
import { AccessDeniedError } from '../../sdk/errors';
import { WorkStationService } from '../../sdk/services';

export default function useWorkStations() {
  const [workStations, setWorkStations] = useState<WorkStation.Collection[]>(
    [],
  );

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchWorkStations = useCallback(() => {
    WorkStationService.getAllWorkStations()
      .then(setWorkStations)
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, []);

  return {
    fetchWorkStations,
    workStations,
    accessDeniedError,
  };
}
