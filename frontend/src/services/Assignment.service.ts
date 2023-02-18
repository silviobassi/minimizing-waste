import { Assignment } from '../@types/Assignment';
import Service from '../Service';

class AssignmentService extends Service {
  static getAllAssignments() {
    return this.Http.get<Assignment.PagedModelAssignment>('/assignments').then(this.getData);
  }

  static fetchAssignments(assignmentId: number) {
    return this.Http.get<Assignment.AssignmentModel>(`/assignments/${assignmentId}`).then(
      this.getData,
    );
  }
}

export default AssignmentService;
