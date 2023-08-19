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

  export type MaterialSupplyModel =
    MinimizingWaste.components['schemas']['MaterialSupplyModel'];
  export type EquipmentSupplyModel =
    MinimizingWaste.components['schemas']['EquipmentSupplyModel'];
  
  export type MovementInput = MinimizingWaste.components['schemas']['SupplyMovementInput']
  export type MovementModel = MinimizingWaste.components['schemas']['SupplyMovementModel']
  export type DevolvedSupplyInput = MinimizingWaste.components['schemas']['DevolvedSupplyMovementInput']
  export type DevolvedSupplyModel = MinimizingWaste.components['schemas']['SupplyMovementDevolvedModel']

  export type Query = {
    supplyName?: number;
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
  };
}
