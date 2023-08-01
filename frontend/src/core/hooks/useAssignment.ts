import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Assignment } from '../../sdk/@types';
import { ResourceNotFoundError } from '../../sdk/errors';
import { AppDispatch, RootState } from '../store';
import * as AssignmentActions from '../store/Assignment.slice';

export default function useAssignment() {
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const assignment = useSelector((s: RootState) => s.assignment.assignment);

  const fetchAssignment = useCallback(
    async (assignmentId: number) => {
      try {
        return dispatch(AssignmentActions.getAssignment(assignmentId)).unwrap();
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          setNotFound(true);
        } else {
          throw error;
        }
      }
    },
    [dispatch],
  );

  const removeAssignment = useCallback(
    async (assignmentId: number) => {
      return await dispatch(AssignmentActions.removeAssignment(assignmentId));
    },
    [dispatch],
  );

  const toggleComplete = useCallback(
    async (completed: Assignment.CompletedInput, assignmentId: number) => {
      return await dispatch(
        AssignmentActions.toggleComplete({ completed, assignmentId }),
      ).unwrap();
    },
    [dispatch],
  );
  const toggleApprove = useCallback(
    async (approved: Assignment.ApprovedInput, assignmentId: number) => {
      return await dispatch(
        AssignmentActions.toggleApprove({ approved, assignmentId }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    assignment,
    fetchAssignment,
    notFound,
    removeAssignment,
    toggleComplete,
    toggleApprove,
  };
}
