import { useCallback } from 'react';
import { Params } from 'react-router-dom';
import { Supply } from '../@types/Supply';
import Service from '../Service';

class SupplyService extends Service {
  static getAllSupplies() {
    return this.Http.get<Supply.Summary[]>('/supplies').then(this.getData);
  }

  static fetchSupply(supplyId: number) {
    return this.Http.get<Supply.Detailed>(`/supplies/${supplyId}`).then(this.getData);
  }
}

export default SupplyService;
