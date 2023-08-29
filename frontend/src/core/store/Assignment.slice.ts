import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assignment } from '../../sdk/@types';
import { AssignmentService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface AssignmentState {
  assignments: Assignment.PagedModelAssignment[] | [];
  fetching: boolean;
}

const initialState: AssignmentState = {
  assignments: [],
  fetching: false,
};

export const getAllAssignments = createAsyncThunk(
  'assignments/getAllUsersAssignmentAssign',
  async (search: Assignment.Query, { rejectWithValue, dispatch }) => {
    try {
      const assignments = await AssignmentService.getAllAssignments(search);
      dispatch(storeAssignments(assignments));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeAssignment = createAsyncThunk(
  'assignments/removeAssignment',
  async (assignmentId: number, { dispatch }) => {
    await AssignmentService.deleteExistingAssignment(assignmentId);
    await dispatch(getAllAssignments({ page: 0, size: 4, sort: ['asc'] }));
  },
);

export const toggleComplete = createAsyncThunk(
  'assignments/toggleComplete',
  async (
    {
      completed,
      assignmentId,
    }: { completed: Assignment.CompletedInput; assignmentId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.completeAssignment(completed, assignmentId);
      await dispatch(getAllAssignments(0));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const toggleApprove = createAsyncThunk(
  'assignments/toggleApprove',
  async (
    {
      approved,
      assignmentId,
    }: { approved: Assignment.ApprovedInput; assignmentId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.approveAssignment(approved, assignmentId);
      await dispatch(getAllAssignments(0));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

const AssignmentSlice = createSlice({
  initialState,
  name: 'assignment',
  reducers: {
    storeAssignments(state, action: PA<Assignment.PagedModelAssignment[]>) {
      state.assignments = action.payload;
    },
  },
});

export const { storeAssignments } = AssignmentSlice.actions;

const assignmentReducer = AssignmentSlice.reducer;

export default assignmentReducer;
