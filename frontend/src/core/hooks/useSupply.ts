import { useCallback, useState } from 'react';
import { Supply } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { SupplyService } from '../../sdk/services';

export default function useSupply() {
  const [supply, setSupply] = useState<Supply.Detailed>();
  const [notFound, setNotFound] = useState<boolean>(false);

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

  const removeSupply = async (supplyId: number) => {
    return await SupplyService.deleteExistingSupply(supplyId);
  };

  return {
    fetchSupply,
    removeSupply,
    supply,
    notFound,
  };
}
