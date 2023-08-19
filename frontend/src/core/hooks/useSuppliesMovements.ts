import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const fetchSuppliesMovements = useCallback(async (page: number) => {
    return dispatch(
      SupplyMovementActions.getAllSuppliesMovements(page),
    ).unwrap();
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
  };
}
