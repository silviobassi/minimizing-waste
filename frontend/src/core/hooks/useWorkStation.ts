import { useCallback, useState } from 'react';
import { WorkStation } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { WorkStationService } from '../../sdk/services';

export default function useWorkStation() {
  const [workStation, setWorkStation] =
    useState<WorkStation.WorkStationModel>();

  const [notFound, setNotFound] = useState<boolean>(false);

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

  const removeWorkStation = async (workStationId: number) => {
    return await WorkStationService.deleteExistingWorkStation(workStationId);
  };

  return {
    fetchWorkStation,
    removeWorkStation,
    workStation,
    notFound,
  };
}
