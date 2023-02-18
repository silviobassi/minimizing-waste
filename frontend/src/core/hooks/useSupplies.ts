import { useCallback, useState } from 'react';
import { Supply } from '../../@types/Supply';
import SupplyService from '../../services/Supply.service';

export default function useSupplies() {
  const [supplies, setSupplies] = useState<Supply.PagedModelSummary[]>([]); 

  const fetchSupplies = useCallback(() => {
    SupplyService.getAllSupplies().then(setSupplies);
  }, []);

  return {
    fetchSupplies,
    supplies
  }
}
