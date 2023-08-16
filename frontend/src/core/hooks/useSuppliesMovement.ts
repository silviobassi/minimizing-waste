import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Supply, SupplyMovementService } from '../../sdk';
import { ResourceNotFoundError } from '../../sdk/errors';
import { AppDispatch } from '../store';
import * as SupplyMovementActions from '../store/SupplyMovement.slice';

export default function useSupplyMovement() {
  const [supplyMovement, setSupplyMovement] = useState<Supply.MovementModel>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const removeSupplyMovement = useCallback(
    async (supplyId: number) => {
      return await dispatch(
        SupplyMovementActions.removeSupplyMovement(supplyId),
      ).unwrap();
    },
    [dispatch],
  );

  const fetchSupplyMovement = useCallback(async (supplyId: number) => {
    try {
      await SupplyMovementService.getSupplyMovement(supplyId).then(
        setSupplyMovement,
      );
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  return {
    removeSupplyMovement,
    fetchSupplyMovement
  };
}
