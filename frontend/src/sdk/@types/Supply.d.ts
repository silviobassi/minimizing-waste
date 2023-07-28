import { MinimizingWaste } from './MinimizingWaste';

export namespace Supply {
  export type PagedModelSummary =
    MinimizingWaste.components['schemas']['PagedModelSupplySummaryModel'];
  export type Detailed =
    MinimizingWaste.components['schemas']['SupplyDetailedModel'];
  export type PagedModelSupplyMovementModel =
    MinimizingWaste.components['schemas']['PagedModelSupplyMovementModel'];

  export type SummaryModel =
    MinimizingWaste.components['schemas']['SupplySummaryModel'];
  export type MaterialInput =
    MinimizingWaste.components['schemas']['SupplyMaterialInput'];
  export type EquipmentInput =
    MinimizingWaste.components['schemas']['SupplyEquipmentInput'];
  export type MaterialModel =
    MinimizingWaste.components['schemas']['MaterialSupplyModel'];
  export type EquipmentModel =
    MinimizingWaste.components['schemas']['EquipmentSupplyModel'];

  export type Query = {
    supplyName?: number;
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
  };
}
