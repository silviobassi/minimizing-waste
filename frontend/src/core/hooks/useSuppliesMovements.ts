import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccessDeniedError } from '../../sdk/errors';
import { AppDispatch, RootState } from '../store';
import * as SupplyMovementActions from '../store/SupplyMovement.slice';

export default function useSupplyMovements() {
  const dispatch = useDispatch<AppDispatch>();

  const suppliesMovements = useSelector(
    (state: RootState) => state.suppliesMovements.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.suppliesMovements.fetching,
  );
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchSuppliesMovements = useCallback(async (page: number) => {
    return dispatch(SupplyMovementActions.getAllSuppliesMovements(page))
      .unwrap()
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }
        throw err;
      });
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
    accessDeniedError,
  };
}
