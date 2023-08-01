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

  const associateEmployee = useCallback(
    async (
      notice: Assignment.AssignmentNotificationInput,
      assignmentId: number,
      employeeResponsibleId: number,
      page: number,
    ) => {
      return await dispatch(
        UsersAssignmentActions.associateEmployee({
          notice,
          assignmentId,
          employeeResponsibleId,
          page,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const disassociateEmployee = useCallback(
    async (
      notice: Assignment.AssignmentNotificationInput,
      assignmentId: number,
      employeeResponsibleId: number,
      page: number,
    ) => {
      return await dispatch(
        UsersAssignmentActions.disassociateEmployee({
          notice,
          assignmentId,
          employeeResponsibleId,
          page,
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
