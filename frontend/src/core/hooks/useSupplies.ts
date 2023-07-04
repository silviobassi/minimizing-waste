import { useCallback, useState } from 'react';
import { Supply } from '../../sdk/@types';
import { AccessDeniedError } from '../../sdk/errors';
import { SupplyService } from '../../sdk/services';

export default function useSupplies() {
  const [supplies, setSupplies] = useState<Supply.PagedModelSummary[]>([]);
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchSupplies = useCallback(async (page: number) => {
    SupplyService.getAllSupplies({
      sort: ['asc'],
      page: page,
      size: 4,
    })
      .then(setSupplies)
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, []);

  return {
    fetchSupplies,
    supplies,
    accessDeniedError
  };
}
