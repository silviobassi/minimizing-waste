import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as WorkStationActions from '../store/WorkStation.slice';
import { User } from '../../sdk';

export default function useWorkStations() {
  const dispatch = useDispatch<AppDispatch>();
  const workStations = useSelector(
    (state: RootState) => state.workStations.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.workStations.fetching,
  );


  const fetchWorkStations = useCallback(
    async (search: User.Query) => {
      return dispatch(
        WorkStationActions.getAllWorkStations(search),
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
