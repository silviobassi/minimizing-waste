import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Assignment } from '../../sdk';
import { AppDispatch, RootState } from '../store';
import * as AssignmentsResponsibleActions from '../store/AssignmentResponsible.slice';

export default function useAssignmentsResponsible() {
  const dispatch = useDispatch<AppDispatch>();

  const assignmentsResponsible = useSelector(
    (state: RootState) => state.assignmentsResponsible.assignments,
  );
  const fetching = useSelector(
    (state: RootState) => state.assignmentsResponsible.fetching,
  );

  const fetchAssignmentsResponsible = useCallback(
    async (search: Assignment.QueryResponsible) => {
      return dispatch(
        AssignmentsResponsibleActions.getAllAssignmentsResponsible(search),
      ).unwrap();
    },
    [dispatch],
  );

  return {
    fetchAssignmentsResponsible,
    assignmentsResponsible,
    fetching,
  };
}
