import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assignment } from '../../sdk/@types';
import { AssignmentService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

type PA<T> = PayloadAction<T>;

interface AssignmentState {
  assignments: Assignment.Responsible[] | [];
  fetching: boolean;
}

const initialState: AssignmentState = {
  assignments: [],
  fetching: false,
};

export const getAllAssignmentsResponsible = createAsyncThunk(
  'assignments/getAllAssignmentsResponsible',
  async (
    search: Assignment.QueryResponsible,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const assignments = await AssignmentService.getAllAssignmentResponsible(
        search,
      );
      dispatch(storeAssignmentsResponsible(assignments));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

const AssignmentResponsibleSlice = createSlice({
  initialState,
  name: 'assignmentResponsible',
  reducers: {
    storeAssignmentsResponsible(
      state,
      action: PA<Assignment.PagedModelAssignment[]>,
    ) {
      state.assignments = action.payload;
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllAssignmentsResponsible,
    ]);

    builder
      .addMatcher(error, (state) => {
        state.fetching = false;
      })
      .addMatcher(success, (state) => {
        state.fetching = false;
      })
      .addMatcher(loading, (state) => {
        state.fetching = true;
      });
  },
});

export const { storeAssignmentsResponsible } =
  AssignmentResponsibleSlice.actions;

const assignmentResponsibleReducer = AssignmentResponsibleSlice.reducer;

export default assignmentResponsibleReducer;
