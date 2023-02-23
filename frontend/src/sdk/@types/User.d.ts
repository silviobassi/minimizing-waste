import { MinimizingWaste } from './MinimizingWaste';

export namespace User {
  export type CollectionDetailed = MinimizingWaste.components['schemas']['CollectionModelUserDetailedModel'];
  export type Detailed = MinimizingWaste.components['schemas']['UserDetailedModel'];
  export type Summary = MinimizingWaste.components['schemas']['UserPhotoModel'];
  export type AccessGroupSummary = MinimizingWaste.components['schemas']['AccessGroupSummary']
  export type Input = MinimizingWaste.components['schemas']['UserInput']
}
