import { MinimizingWaste } from './MinimizingWaste';

export namespace Supply {
  export type PagedModelSummary =
    MinimizingWaste.components['schemas']['PagedModelSupplySummaryModel'];
  export type Detailed =
    MinimizingWaste.components['schemas']['SupplyDetailedModel'];
  export type PagedModelSupplyMovementModel =
    MinimizingWaste.components['schemas']['PagedModelSupplyMovementModel'];

    export type SummaryModel = MinimizingWaste.components['schemas']['SupplySummaryModel']

  export type Query = {
    supplyName?: number;
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
  };
}
