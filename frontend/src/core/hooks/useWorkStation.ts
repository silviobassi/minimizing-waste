import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import * as WorkStationActions from '../store/WorkStation.slice';

export default function useWorkStation() {
  const dispatch = useDispatch<AppDispatch>();

  const removeWorkStation = useCallback(
    async (workStationId: number) => {
      return await dispatch(
        WorkStationActions.removeWorkStation(workStationId),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    removeWorkStation,
  };
}
