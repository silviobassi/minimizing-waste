import { Assignment } from '../@types/Assignment';
import Service from '../Service';
import { generateQueryString } from '../utils';

class AssignmentService extends Service {
  static getAllAssignments(search: Assignment.Query) {
    const queryString = generateQueryString(search);
    return this.Http.get<Assignment.PagedModelAssignment>(
      "/assignments".concat(queryString)
    ).then(this.getData);
  }

  static getAssignment(assignmentId: number) {
    return this.Http.get<Assignment.AssignmentModel>(
      `/assignments/${assignmentId}`,
    ).then(this.getData);
  }

  static createAssignment(
    assignment: Assignment.AssignmentInput,
  ): Assignment.AssignmentModel {
    return this.Http.post<Assignment.AssignmentModel>(
      '/assignments',
      assignment,
    ).then(this.getData);
  }

  static updateExistingAssignment(
    assignment: Assignment.AssignmentInput,
    assignmentId: number,
  ): Assignment.AssignmentInput {
    return this.Http.put<Assignment.AssignmentInput>(
      `/assignments/${assignmentId}`,
      assignment,
    ).then(this.getData);
  }

  static deleteExistingAssignment(assignmentId: number) {
    return this.Http.delete(`/assignments/${assignmentId}`).then(
      this.getStatus,
    );
  }

  static associateEmployee(
    notice: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.put<{}>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}/associate`,
      notice,
    ).then(this.getStatus);
  }

  static disassociateEmployee(
    notice: Assignment.AssignmentNotificationInput,
    assignmentId: number,
    employeeResponsibleId: number,
  ) {
    return this.Http.put<{}>(
      `/assignments/${assignmentId}/employee-responsible/${employeeResponsibleId}/disassociate`,
      notice,
    ).then(this.getStatus);
  }

  static completeAssignment(
    completed: Assignment.CompletedInput,
    assignmentId: number,
  ) {
    return this.Http.put<{}>(
      `/assignments/${assignmentId}/conclusion`,
      completed,
    ).then(this.getStatus);
  }
  static approveAssignment(
    approved: Assignment.ApprovedInput,
    assignmentId: number,
  ) {
    return this.Http.put<{}>(
      `/assignments/${assignmentId}/approval`,
      approved,
    ).then(this.getStatus);
  }
}

export default AssignmentService;