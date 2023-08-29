import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as SupplyActions from '../store/Supply.slice';
import { Supply } from '../../sdk';

export default function useSupplies() {
  const dispatch = useDispatch<AppDispatch>();
  const supplies = useSelector((state: RootState) => state.supplies.list);
  const fetching = useSelector((state: RootState) => state.supplies.fetching);

  const fetchSupplies = useCallback(async (search: Supply.Query) => {
    return dispatch(SupplyActions.getAllSupplies(search)).unwrap();
  }, []);

  return {
    fetchSupplies,
    supplies,
    fetching,
  };
}
