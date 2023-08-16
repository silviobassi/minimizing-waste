import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as SupplyActions from '../store/Supply.slice';

export default function useSupplies() {
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const supplies = useSelector((state: RootState) => state.supplies.list);
  const fetching = useSelector((state: RootState) => state.supplies.fetching);

  const fetchSupplies = useCallback(async (page?: number, size?: number) => {
    return dispatch(SupplyActions.getAllSupplies({ page, size })).unwrap();
  }, []);

  return {
    fetchSupplies,
    supplies,
    fetching,
    accessDeniedError,
  };
}
