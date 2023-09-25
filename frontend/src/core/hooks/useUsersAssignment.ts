import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Assignment } from '../../sdk';
import { ResourceNotFoundError } from '../../sdk/errors';
import { AppDispatch, RootState } from '../store';
import * as UsersAssignmentActions from '../store/UsersAssignment.slice';

export default function useUsersAssignments() {
  const dispatch = useDispatch<AppDispatch>();
  const [notFound, setNotFound] = useState<boolean>(false);

  const assignments = useSelector(
    (state: RootState) => state.assignment.assignments,
  );
  const assignment = useSelector(
    (state: RootState) => state.usersAssignmentAssigned.assignment,
  );
  const fetching = useSelector((state: RootState) => state.assignment.fetching);

  const usersAssignmentAssign = useSelector(
    (state: RootState) => state.usersAssignmentAssigned.list,
  );

  const fetchAssignment = useCallback(
    async (assignmentId: number) => {
      try {
        return dispatch(
          UsersAssignmentActions.getAssignment(assignmentId),
        ).unwrap();
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

  const fetchUserAssignmentsAssigned = useCallback(
    async (search: Assignment.Query, assignmentId: number) => {
      return dispatch(
        UsersAssignmentActions.getAllUsersAssignmentAssign({
          search,
          assignmentId,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const associateEmployee = useCallback(
    async (
      assignmentId: number,
      employeeResponsibleId: number,
      search: Assignment.Query,
    ) => {
      return await dispatch(
        UsersAssignmentActions.associateEmployee({
          assignmentId,
          employeeResponsibleId,
          search,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const disassociateEmployee = useCallback(
    async (
      assignmentId: number,
      employeeResponsibleId: number,
      search: Assignment.Query,
    ) => {
      return await dispatch(
        UsersAssignmentActions.disassociateEmployee({
          assignmentId,
          employeeResponsibleId,
          search,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchUserAssignmentsAssigned,
    fetchAssignment,
    associateEmployee,
    disassociateEmployee,
    assignments,
    assignment,
    usersAssignmentAssign,
    fetching,
    notFound,
  };
}
