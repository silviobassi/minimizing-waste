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

  static getSupply(supplyId: number): Supply.Detailed {
    return this.Http.get<Supply.Detailed>(`/supplies/${supplyId}`).then(
      this.getData,
    );
  }

  static createSupplyMaterial(supplyMaterial: Supply.MaterialInput) {
    return this.Http.post<Supply.MaterialModel>(
      '/supplies/materials',
      supplyMaterial,
    ).then(this.getData);
  }

  static createSupplyEquipment(supplyEquipment: Supply.EquipmentInput) {
    return this.Http.post<Supply.EquipmentModel>(
      '/supplies/equipments',
      supplyEquipment,
    ).then(this.getData);
  }

  static updateExistingSupplyMaterial(
    supplyEquipment: Supply.MaterialInput,
    supplyMaterialId: number,
  ) {
    return this.Http.put<Supply.MaterialModel>(
      `/supplies/materials/${supplyMaterialId}`,
      supplyEquipment,
    ).then(this.getData);
  }

  static updateExistingSupplyEquipment(
    supplyEquipment: Supply.EquipmentInput,
    supplyMaterialId: number,
  ) {
    return this.Http.put<Supply.EquipmentModel>(
      `/supplies/equipments/${supplyMaterialId}`,
      supplyEquipment,
    ).then(this.getData);
  }

  static deleteExistingSupply(supplyId: number) {
    return this.Http.delete<{}>(`/supplies/${supplyId}`).then(this.getStatus);
  }
}

export default SupplyService;
