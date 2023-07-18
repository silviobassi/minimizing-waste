import { Assignment } from '../@types/Assignment';
import Service from '../Service';

class AssignmentService extends Service {
  static getAllAssignments() {
    return this.Http.get<Assignment.PagedModelAssignment>('/assignments').then(
      this.getData,
    );
  }

  static getAssignment(assignmentId: number) {
    return this.Http.get<Assignment.AssignmentModel>(
      `/assignments/${assignmentId}`,
    ).then(this.getData);
  }

  static associateEmployee(
    notification: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.put<void>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}`,
      notification,
    ).then(this.getData);
  }

  static disassociateEmployee(
    notification: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.delete<void>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}`,
      notification,
    ).then(this.getData);
  }
}

export default AssignmentService;
