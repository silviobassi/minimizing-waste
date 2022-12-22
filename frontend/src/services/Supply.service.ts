import { Supply } from '../@types/Supply';
import Service from '../Service';

class SupplyService extends Service {
  static getAllSupplies() {
    return this.Http.get<Supply.Summary[]>('/supplies').then(this.getData);
  }
}

export default SupplyService;
