import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WorkStation } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { WorkStationService } from '../../sdk/services';
import { AppDispatch } from '../store';
import * as WorkStationActions from '../store/WorkStation.slice';

export default function useWorkStation() {
  const [workStation, setWorkStation] =
    useState<WorkStation.WorkStationModel>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

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

  const removeWorkStation = useCallback(
    async (workStationId: number) => {
      return await dispatch(
        WorkStationActions.removeWorkStation(workStationId),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchWorkStation,
    removeWorkStation,
    workStation,
    notFound,
  };
}
