import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Supply } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { SupplyService } from '../../sdk/services';
import { AppDispatch } from '../store';
import * as SupplyActions from '../store/Supply.slice';

export default function useSupply() {
  const [supply, setSupply] = useState<Supply.Detailed>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchSupply = useCallback(async (supplyId: number) => {
    try {
      await SupplyService.getSupply(supplyId).then(setSupply);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  const removeSupply = useCallback(
    async (supplyId: number) => {
      return await dispatch(SupplyActions.removeSupply(supplyId));
    },
    [dispatch],
  );

  return {
    fetchSupply,
    removeSupply,
    supply,
    notFound,
  };
}
