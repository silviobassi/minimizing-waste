import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as SupplyMovementActions from '../store/SupplyMovement.slice';
import { Supply } from '../../sdk';

export default function useSupplyMovements() {
  const dispatch = useDispatch<AppDispatch>();

  const suppliesMovements = useSelector(
    (state: RootState) => state.suppliesMovements.list,
  );
  const fetching = useSelector(
    (state: RootState) => state.suppliesMovements.fetching,
  );

  const fetchSuppliesMovements = useCallback(async (search: Supply.Query) => {
    return dispatch(
      SupplyMovementActions.getAllSuppliesMovements(search),
    ).unwrap();
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
    fetching
  };
}
