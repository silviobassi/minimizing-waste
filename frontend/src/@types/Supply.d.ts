import { MinimizingWaste } from './MinimizingWaste';

export namespace Supply {
  export type PagedModelSummary = MinimizingWaste['schemas']['PagedModelSupplySummaryModel'];
  export type Detailed = MinimizingWaste['schemas']['SupplyDetailedModel'];
  export type PagedModelSupplyMovementModel = MinimizingWaste['schemas']['PagedModelSupplyMovementModel']
}
