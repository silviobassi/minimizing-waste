import { useCallback, useState } from 'react';
import { Assignment } from '../../sdk/@types';
import { AccessDeniedError } from '../../sdk/errors';
import { AssignmentService } from '../../sdk/services';

export default function useAssignments() {
  const [assignments, setAssignments] = useState<
    Assignment.PagedModelAssignment[]
  >([]);

  const [accessDeniedError, setAccessDeniedError] = useState(false);

  const fetchAssignments = useCallback(() => {
    AssignmentService.getAllAssignments()
      .then(setAssignments)
      .catch((err: any) => {
        if (err instanceof AccessDeniedError) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      });
  }, []);

  return {
    fetchAssignments,
    assignments,
    accessDeniedError,
  };
}
