import { Communication } from '../@types';
import Service from '../Service';
import { generateQueryString } from '../utils';

class NotificationService extends Service {
  static getAvailableSupplies(search: Communication.Query) {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.SupplyMovementNotification[]>(
      '/supplies-movement/notifications/available'.concat(queryString),
    ).then(this.getData);
  }

  static getAvailableAssignedTasks(
    search: Communication.Query,
  ): Communication.AssignmentNotification {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.AssignmentNotification[]>(
      '/notifications/assignments'.concat(queryString),
    ).then(this.getData);
  }

  static getAvailableUnassignedTasks(
    search: Communication.Query,
  ): Communication.AssignmentNotification {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.AssignmentNotification[]>(
      '/notifications/assignments?assign=unassignedTasks'.concat(queryString),
    ).then(this.getData);
  }

  static getAssignmentsExpired(
    search: Communication.Query,
  ): Communication.AssignmentNotification {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available`.concat(queryString),
    ).then(this.getData);
  }

  static getAssignmentsApproved(
    search: Communication.Query,
  ): Communication.AssignmentNotification {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available`.concat(queryString),
    ).then(this.getData);
  }

  static getAssignmentsCompleted(
    search: Communication.Query,
  ): Communication.AssignmentNotification {
    const queryString = generateQueryString(search);
    return this.Http.get<Communication.AssignmentNotification[]>(
      `/notifications/assignments/available`.concat(queryString),
    ).then(this.getData);
  }
}

export default NotificationService;
