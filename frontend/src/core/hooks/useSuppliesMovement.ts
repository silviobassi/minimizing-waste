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
    async (supplyMovementId: number) => {
      return await dispatch(
        SupplyMovementActions.removeSupplyMovement(supplyMovementId),
      ).unwrap();
    },
    [dispatch],
  );

  const vacateSupplyMovement = useCallback(
    async (supplyMovementId: number) => {
      return await dispatch(
        SupplyMovementActions.vacateSupplyMovement(supplyMovementId),
      ).unwrap();
    },
    [dispatch],
  );

  const giveBackSupplyMovement = useCallback(
    async (
      supplyMovementId: number,
      movementDevolved: Supply.DevolvedSupplyInput,
    ) => {
      return await dispatch(
        SupplyMovementActions.giveBackSupplyMovement({
          supplyMovementId,
          movementDevolved,
        }),
      ).unwrap()
    },
    [dispatch],
  );

  const endSupply = useCallback(
    async (supplyMovementId: number) => {
      return await dispatch(
        SupplyMovementActions.endSupply(supplyMovementId),
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
    vacateSupplyMovement,
    giveBackSupplyMovement,
    endSupply,
    fetchSupplyMovement,
    supplyMovement,
    notFound,
  };
}
