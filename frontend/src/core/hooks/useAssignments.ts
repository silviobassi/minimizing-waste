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

  const usersAssignmentAssign = useSelector(
    (state: RootState) => state.usersAssignmentAssigned.list,
  );

  const fetchAssignments = useCallback(
    async (page: number) => {
      return dispatch(AssignmentActions.getAllAssignments(page)).unwrap();
    },
    [dispatch],
  );

  const fetchUserAssignmentsAssigned = useCallback(
    async (page: number, assigned: boolean, assignmentId: number) => {
      return dispatch(
        UsersAssignmentActions.getAllUsersAssignmentAssign({
          page,
          assigned,
          assignmentId,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchAssignments,
    fetchUserAssignmentsAssigned,
    assignments,
    usersAssignmentAssign,
    fetching,
  };
}
