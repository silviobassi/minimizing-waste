import { useCallback, useState } from 'react';
import { WorkStation } from '../../sdk/@types';
import { AccessDeniedError, ResourceNotFoundError } from '../../sdk/errors';
import { WorkStationService } from '../../sdk/services';

export default function useWorkStations() {
  const [workStations, setWorkStations] = useState<WorkStation.Collection[]>(
    [],
  );
  const [workStation, setWorkStation] =
    useState<WorkStation.WorkStationModel>();

  const [notFound, setNotFound] = useState<boolean>(false);

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchWorkStations = useCallback((page: number) => {
    WorkStationService.getAllWorkStations({
      page: page,
      size: 4,
      sort: ['asc'],
    })
      .then(setWorkStations)
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, []);

  const fetchWorkStation = useCallback(async (workStationId: number) => {
    try {
      await WorkStationService.getWorkStation(workStationId).then(
        setWorkStation,
      );
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  return {
    fetchWorkStations,
    workStations,
    fetchWorkStation,
    workStation,
    accessDeniedError,
    notFound,
  };
}
