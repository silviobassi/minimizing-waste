import { MinimizingWaste } from './MinimizingWaste';

export namespace Role {
  export type Input = MinimizingWaste.components['schemas']['RoleInput'];
  export type Detailed =
    MinimizingWaste.components['schemas']['RoleDetailedModel'];
  export type CollectionDetailed =
    MinimizingWaste.components['schemas']['CollectionModelRoleDetailedModel'];
}
