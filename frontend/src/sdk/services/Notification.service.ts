import { Communication } from '../@types';
import Service from '../Service';

class NotificationService extends Service {
  static getAvailableSupplies() {
    return this.Http.get<Communication.SupplyMovementNotification[]>(
      '/supplies-movement/notifications/available',
    ).then(this.getData);
  }

  static getAvailableAssignments() {
    return this.Http.get<Communication.AssignmentNotification[]>(
      '/notifications/assignments/available',
    ).then(this.getData);
  }
}

export default NotificationService;
