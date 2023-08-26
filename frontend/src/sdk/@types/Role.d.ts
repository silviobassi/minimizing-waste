import { MinimizingWaste } from './MinimizingWaste';

export namespace Role {
  export type Input = MinimizingWaste.components['schemas']['RoleInput'];
  export type Detailed =
    MinimizingWaste.components['schemas']['RoleDetailedModel'];
    export type Summary =
    MinimizingWaste.components['schemas']['RoleSummaryModel'];
  export type CollectionDetailed =
    MinimizingWaste.components['schemas']['CollectionModelRoleDetailedModel'];
    export type CollectionSummary =
    MinimizingWaste.components['schemas']['CollectionModelRoleSummaryModel'];

    export type Query = {
      role?: string;
    };
}
