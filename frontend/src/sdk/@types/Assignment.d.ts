import { MinimizingWaste } from './MinimizingWaste';

export namespace Assignment {
  export type AssignmentModel =
    MinimizingWaste.components['schemas']['AssignmentModel'];
  export type PagedModelAssignment =
    MinimizingWaste.components['schemas']['PagedModelAssignmentDefaultModel'];
  export type AssignmentNotificationInput =
    MinimizingWaste.components['schemas']['AssignmentNotificationInput'];
  export type AssignmentInput =
    MinimizingWaste.components['schemas']['AssignmentInput'];
  export type CompletedInput =
    MinimizingWaste.components['schemas']['AssignmentCompletedInput'];
  export type ApprovedInput =
    MinimizingWaste.components['schemas']['AssignmentApprovedInput'];
  export type Responsible =
    MinimizingWaste.components['schemas']['CollectionModelAssignmentResponsibleModel'];

  export type Query = {
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
    assignmentTitle?: string;
    startDate?: string;
    endDate?: string;
    approveDate?: string;
    deadline?: string;
  };

  export type QueryResponsible = {
    responsibleName?: string;
    responsibleCpf?: string;
  };
}
