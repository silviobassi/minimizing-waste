import { useCallback, useState } from 'react';
import { Supply } from '../../@types/Supply';
import SupplyMovementService from '../../services/SupplyMovement.service';

export default function useSectors() {
  const [suppliesMovements, setSuppliesMovements] = useState<Supply.PagedModelSupplyMovementModel[]>([]);

  const fetchSuppliesMovements = useCallback(() => {
    SupplyMovementService.getAllSupplyMovements().then(setSuppliesMovements);
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
  };
}