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
    notice: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.put<void>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}/associate`,
      notice,
    ).then(this.getData);
  }

  static disassociateEmployee(
    notice: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.put<void>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}/disassociate`,
      notice,
    ).then(this.getData);
  }
}

export default AssignmentService;
