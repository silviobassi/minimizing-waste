import { MinimizingWaste } from './MinimizingWaste';

export namespace Communication {
  export type SupplyMovementNotification =
    MinimizingWaste.components['schemas']['SupplyMovementNotificationModel'];
  export type AssignmentNotification =
    MinimizingWaste.components['schemas']['AssignmentNotificationModel'];

}
