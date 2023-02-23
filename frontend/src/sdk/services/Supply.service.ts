import { Supply } from '../@types/Supply';
import Service from '../Service';
import { generateQueryString } from '../utils';

class SupplyService extends Service {
  static getAllSupplies(search: Supply.Query): Supply.PagedModelSummary {
    const queryString = generateQueryString(search);
    return this.Http.get<Supply.PagedModelSummary[]>(
      '/supplies'.concat(queryString),
    ).then(this.getData);
  }

  static fetchSupply(supplyId: number): Supply.Detailed {
    return this.Http.get<Supply.Detailed>(`/supplies/${supplyId}`).then(
      this.getData,
    );
  }
}

export default SupplyService;
