import { MinimizingWaste } from './MinimizingWaste';

export namespace User {
  export type PagedModelDetailed =
    MinimizingWaste.components['schemas']['PagedModelUserDetailedModel'];
  export type PagedModelUserAssigned =
    MinimizingWaste.components['schemas']['PagedModelUserAssignedModel'];
  export type Detailed =
    MinimizingWaste.components['schemas']['UserDetailedModel'];
  export type Assigned =
    MinimizingWaste.components['schemas']['UserAssignedModel'];
  export type Summary = MinimizingWaste.components['schemas']['UserPhotoModel'];
  export type AccessGroupSummary =
    MinimizingWaste.components['schemas']['AccessGroupSummary'];
  export type Input = MinimizingWaste.components['schemas']['UserInput'];
  export type UpdateInput =
    MinimizingWaste.components['schemas']['UserUpdateInput'];

  export type Avatar = MinimizingWaste.components['schemas']['AvatarModel'];
  export type UserAssignment =
    MinimizingWaste.components['schemas']['UserAssignmentModel'];

  export type Query = {
    supplyName?: number;
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
  };
}
