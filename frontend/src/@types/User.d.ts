import { MinimizingWaste } from './MinimizingWaste';

export namespace User {
  export type CollectionDetailed = MinimizingWaste['schemas']['CollectionModelUserDetailedModel'];
  export type Detailed = MinimizingWaste['schemas']['UserDetailedModel'];
  export type Summary = MinimizingWaste['schemas']['UserPhotoModel'];
  export type AccessGroupSummary = MinimizingWaste['schemas']['AccessGroupSummary']
}
