import { MinimizingWaste } from './MinimizingWaste';

export namespace Communication {
  export type SupplyMovementNotification =
    MinimizingWaste.components['schemas']['PagedModelSupplyMovementNotificationModel'];
  export type AssignmentNotification =
    MinimizingWaste.components['schemas']['PagedModelAssignmentNotificationModel'];
  export type Notification =
    MinimizingWaste.components['schemas']['NotificationModel'];
  export type SupplyMovementNotificationModel = MinimizingWaste.components['schemas']['SupplyMovementNotificationModel']

  export type Query = {
    page?: number;
    size?: number;
    sort?: ['asc' | 'desc'];
    assign?: string;
    currentDate?: string,
    approved?: boolean,
    completed?: boolean
  };
}
