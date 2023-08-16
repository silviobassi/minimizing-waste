import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccessDeniedError } from '../../sdk/errors';
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

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchWorkStations = useCallback(
    async (page?: number, size?: number) => {
      return dispatch(WorkStationActions.getAllWorkStations({ page, size }))
        .unwrap()
        .catch((err: any) => {
          if (err instanceof AccessDeniedError) {
            setAccessDeniedError(true);
            return;
          }

          throw err;
        });
    },
    [dispatch],
  );

  return {
    fetchWorkStations,
    workStations,
    fetching,
    accessDeniedError,
  };
}
