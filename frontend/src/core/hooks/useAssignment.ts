import { useCallback, useState } from 'react';
import { Assignment } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { AssignmentService } from '../../sdk/services';

export default function useAssignment() {
  const [assignment, setAssignment] = useState<Assignment.AssignmentModel>();
  const [notFound, setNotFound] = useState(false);

  const fetchAssignment = useCallback(async (assignmentId: number) => {
    try {
      await AssignmentService.getAssignment(assignmentId).then(setAssignment);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setNotFound(true);
      } else {
        throw error;
      }
    }
  }, []);

  const removeAssignment = async (assignmentId: number) => {
    await AssignmentService.deleteExistingAssignment(assignmentId);
  };

  return {
    assignment,
    fetchAssignment,
    notFound,
    removeAssignment
  };
}
