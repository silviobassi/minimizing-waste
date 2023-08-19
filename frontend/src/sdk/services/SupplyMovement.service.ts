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

  static updateExistingSupplyMovement(
    movement: Supply.MovementInput,
    supplyMovementId: number,
  ) {
    return this.Http.put<Supply.EquipmentModel>(
      `/supplies-movements/${supplyMovementId}`,
      movement,
    ).then(this.getData);
  }

  static deleteExistingSupplyMovement(supplyMovementId: number) {
    return this.Http.delete<{}>(`/supplies-movements/${supplyMovementId}`).then(
      this.getStatus,
    );
  }

  static vacateSupplyMovement(supplyMovementId: number) {
    return this.Http.delete<{}>(
      `/supplies-movements/vacancies/${supplyMovementId}`,
    ).then(this.getStatus);
  }

  static giveBackSupplyMovement(
    supplyMovementId: number,
    movementDevolved: Supply.DevolvedSupplyInput,
  ): Supply.DevolvedSupplyModel {
    return this.Http.put<Supply.DevolvedSupplyModel>(
      `/supplies-movements/give-back/${supplyMovementId}`,
      movementDevolved,
    ).then(this.getData);
  }

  static endSupply(supplyMovementId: number) {
    return this.Http.delete<{}>(
      `/supplies-movements/end/${supplyMovementId}/supply`,
    ).then(this.getStatus);
  }
}

export default SupplyMovementService;
