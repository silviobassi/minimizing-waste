import { Communication } from '../@types';
import Service from '../Service';

class NotificationService extends Service {
  static getAvailableSupplies() {
    return this.Http.get<Communication.SupplyMovementNotification[]>(
      '/supplies-movement/notifications/available',
    ).then(this.getData);
  }

  static getAvailableAssignedTasks(): Communication.AssignmentNotification {
    return this.Http.get<Communication.AssignmentNotification[]>(
      '/notifications/assignments?assign=assignedTasks',
    ).then(this.getData);
  }

  static getAvailableUnassignedTasks(): Communication.AssignmentNotification {
    return this.Http.get<Communication.AssignmentNotification[]>(
      '/notifications/assignments?assign=unassignedTasks',
    ).then(this.getData);
  }

  static getAssignmentsExpired(
    currentDate: string,
  ): Communication.AssignmentNotification {
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available?currentDate=${currentDate}`,
    ).then(this.getData);
  }

  static getAssignmentsApproved(
    approved: boolean,
  ): Communication.AssignmentNotification {
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available?approved=${approved}`,
    ).then(this.getData);
  }

  static getAssignmentsCompleted(
    completed: boolean,
  ): Communication.AssignmentNotification {
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available?completed=${completed}`,
    ).then(this.getData);
  }
}

export default NotificationService;
