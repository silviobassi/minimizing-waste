import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as WorkStationActions from '../store/WorkStation.slice';

export default function useWorkStations() {
  const dispatch = useDispatch<AppDispatch>();
  const workStations = useSelector(
    (state: RootState) => state.workStations.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.workStations.fetching,
  );


  const fetchWorkStations = useCallback(
    async (page?: number, size?: number) => {
      return dispatch(
        WorkStationActions.getAllWorkStations({ page, size }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchWorkStations,
    workStations,
    fetching,
  };
}
