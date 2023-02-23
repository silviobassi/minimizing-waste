import { useCallback, useState } from 'react';
import { Supply } from '../../sdk/@types';
import { SupplyMovementService } from '../../sdk/services';

export default function useSectors() {
  const [suppliesMovements, setSuppliesMovements] = useState<
    Supply.PagedModelSupplyMovementModel[]
  >([]);

  const fetchSuppliesMovements = useCallback(() => {
    SupplyMovementService.getAllSupplyMovements().then(setSuppliesMovements);
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
  };
}
