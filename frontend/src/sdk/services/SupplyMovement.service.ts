import { Supply } from '../@types/Supply';
import Service from '../Service';
import { generateQueryString } from '../utils';
class SupplyMovementService extends Service {
  static getAllSuppliesMovement(
    search: Supply.Query,
  ): Supply.PagedModelSupplyMovementModel {
    const queryString = generateQueryString(search);
    return this.Http.get<Supply.PagedModelSupplyMovementModel[]>(
      '/supplies-movements'.concat(queryString),
    ).then(this.getData);
  }

  static getSupplyMovement(supplyMovementId: number) {
    return this.Http.get<Supply.PagedModelSupplyMovementModel>(
      `/supplies-movements/${supplyMovementId}`,
    ).then(this.getData);
  }

  static createSupplyMovement(
    movement: Supply.MovementInput,
  ): Supply.MovementModel {
    return this.Http.post<Supply.MovementModel>(
      '/supplies-movements',
      movement,
    ).then(this.getData);
  }

  static deleteExistingSupplyMovement(supplyMovementId: number) {
    return this.Http.delete<{}>(`/supplies-movements/${supplyMovementId}`).then(
      this.getStatus,
    );
  }
}

export default SupplyMovementService;
