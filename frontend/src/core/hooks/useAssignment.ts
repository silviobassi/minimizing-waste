import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Assignment } from '../../sdk/@types';
import { AppDispatch } from '../store';
import * as AssignmentActions from '../store/Assignment.slice';

export default function useAssignment() {
  const dispatch = useDispatch<AppDispatch>();

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
    removeAssignment,
    toggleComplete,
    toggleApprove,
  };
}
