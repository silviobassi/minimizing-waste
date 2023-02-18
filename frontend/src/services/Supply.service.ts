import { Supply } from '../@types/Supply';
import Service from '../Service';

class SupplyService extends Service {
  static async  getAllSupplies(): Supply.PagedModelSummary {
    return await  this.Http.get<Supply.PagedModelSummary[]>('/supplies').then(
      this.getData
    );
  }

  static fetchSupply(supplyId: number): Supply.Detailed {
    return this.Http.get<Supply.Detailed>(`/supplies/${supplyId}`).then(
      this.getData,
    );
  }
}

export default SupplyService;
