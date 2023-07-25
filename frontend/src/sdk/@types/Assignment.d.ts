import { MinimizingWaste } from './MinimizingWaste';

export namespace Assignment {
  export type AssignmentModel =
    MinimizingWaste.components['schemas']['AssignmentModel'];
  export type PagedModelAssignment =
    MinimizingWaste.components['schemas']['PagedModelAssignmentDefaultModel'];
  export type AssignmentNotificationInput =
    MinimizingWaste.components['schemas']['AssignmentNotificationInput'];
  export type AssignmentInput = MinimizingWaste.components['schemas']['AssignmentInput']
}
