import { useCallback, useState } from 'react';
import { Supply } from '../../sdk/@types';
import { AccessDeniedError } from '../../sdk/errors';
import { SupplyMovementService } from '../../sdk/services';

export default function useSectors() {
  const [suppliesMovements, setSuppliesMovements] = useState<
    Supply.PagedModelSupplyMovementModel[]
  >([]);

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchSuppliesMovements = useCallback(() => {
    SupplyMovementService.getAllSupplyMovements()
      .then(setSuppliesMovements)
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, []);

  return {
    fetchSuppliesMovements,
    suppliesMovements,
    accessDeniedError
  };
}
