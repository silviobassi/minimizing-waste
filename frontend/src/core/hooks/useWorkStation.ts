import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WorkStation, WorkStationService } from '../../sdk';
import { ResourceNotFoundError } from '../../sdk/errors';
import { AppDispatch } from '../store';
import * as WorkStationActions from '../store/WorkStation.slice';

export default function useWorkStation() {
  const dispatch = useDispatch<AppDispatch>();

  const [workStation, setWorkStation] = useState<WorkStation.Input>();
  const [notFound, setNotFound] = useState<boolean>();

  const removeWorkStation = useCallback(
    async (workStationId: number) => {
      return await dispatch(
        WorkStationActions.removeWorkStation(workStationId),
      ).unwrap();
    },
    [dispatch],
  );

  const fetchWorkStation = useCallback(async (userId: number) => {
    try {
      await WorkStationService.getWorkStation(userId).then(setWorkStation);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  return {
    removeWorkStation,
    fetchWorkStation,
    workStation,
    notFound
  };
}
