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
  export type RoleDetailedModel =
    MinimizingWaste.components['schemas']['RoleDetailedModel'];
  export type Input = MinimizingWaste.components['schemas']['UserInput'];
  export type UpdateInput =
    MinimizingWaste.components['schemas']['UserUpdateInput'];

  export type Avatar = MinimizingWaste.components['schemas']['AvatarModel'];
  export type UserAssignment =
    MinimizingWaste.components['schemas']['UserAssignmentModel'];

  export type SummaryNameModel =
    MinimizingWaste.components['schemas']['CollectionModelUserSummaryModel'];
  export type PasswordInput =
    MinimizingWaste.components['schemas']['PasswordInput'];

  export type Query = {
    page?: number;
    size?: number;
    sort?: [keyof Detailed, 'asc' | 'desc'];
    assigned?: boolean;
    userName?: string;
    userCpf?: string;
  };
}
