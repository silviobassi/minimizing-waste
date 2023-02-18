import { useCallback, useState } from 'react';
import { Assignment } from '../../@types/Assignment';
import AssignmentService from '../../services/Assignment.service';

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
