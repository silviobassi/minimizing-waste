import { Supply } from '../@types/Supply';
import Service from '../Service';

class SupplyMovementService extends Service {
  static getAllSupplyMovements() {
    return this.Http.get<Supply.PagedModelSupplyMovementModel>('/supplies-movements').then(this.getData);
  }

  static fetchSupplyMovements(supplyMovementId: number) {
    return this.Http.get<Supply.PagedModelSupplyMovementModel>(`/supplies-movements/${supplyMovementId}`).then(
      this.getData,
    );
  }
}

export default SupplyMovementService;