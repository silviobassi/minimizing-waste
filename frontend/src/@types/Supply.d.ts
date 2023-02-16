import { MinimizingWaste } from './MinimizingWaste';

export namespace Supply {
  export type Summary = MinimizingWaste['schemas']['SupplySummaryModel'];
  export type Detailed = MinimizingWaste['schemas']['SupplyDetailedModel'];
}
