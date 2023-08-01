import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as AssignmentActions from '../store/Assignment.slice';
import * as UsersAssignmentActions from '../store/UsersAssignment.slice';

export default function useAssignments() {
  const dispatch = useDispatch<AppDispatch>();

  const assignments = useSelector(
    (state: RootState) => state.assignment.assignments,
  );
  const fetching = useSelector((state: RootState) => state.assignment.fetching);

  const fetchAssignments = useCallback(
    async (page: number) => {
      return dispatch(AssignmentActions.getAllAssignments(page)).unwrap();
    },
    [dispatch],
  );

  
  return {
    fetchAssignments,
    assignments,
    fetching,
  };
}
