import { useCallback, useState } from 'react';
import { Supply } from '../../sdk/@types';
import { SupplyService } from '../../sdk/services';

export default function useSupplies() {
  const [supplies, setSupplies] = useState<Supply.PagedModelSummary[]>([]);

  const fetchSupplies = useCallback(
    async (page: number) => {
      SupplyService.getAllSupplies({
        sort: ['asc'],
        page: page,
        size: 4,
      }).then(setSupplies);
    },
    [],
  );

  return {
    fetchSupplies,
    supplies,
  };
}
