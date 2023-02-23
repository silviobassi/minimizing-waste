import { useCallback, useState } from 'react';
import { Assignment } from '../../sdk/@types';
import { AssignmentService } from '../../sdk/services';

export default function useSectors() {
  const [assignments, setAssignments] = useState<
    Assignment.PagedModelAssignment[]
  >([]);

  const fetchAssignments = useCallback(() => {
    AssignmentService.getAllAssignments().then(setAssignments);
  }, []);

  return {
    fetchAssignments,
    assignments,
  };
}
