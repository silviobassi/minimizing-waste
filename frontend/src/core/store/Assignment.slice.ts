import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assignment } from '../../sdk/@types';
import { AssignmentService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface AssignmentState {
  assignments: Assignment.PagedModelAssignment[] | [];
  assignment: Assignment.AssignmentModel | null;
  fetching: boolean;
}

const initialState: AssignmentState = {
  assignments: [],
  assignment: null,
  fetching: false,
};

export const getAllAssignments = createAsyncThunk(
  'assignments/getAllUsersAssignmentAssign',
  async (page: number, { rejectWithValue, dispatch }) => {
    try {
      const assignments = await AssignmentService.getAllAssignments({
        page: page,
        sort: ['asc'],
        size: 4,
      });
      dispatch(storeAssignments(assignments));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getAssignment = createAsyncThunk(
  'assignments/getAssignment',
  async (assignmentId: number, { rejectWithValue, dispatch }) => {
    try {
      const assignment = await AssignmentService.getAssignment(assignmentId);
      dispatch(storeAssignment(assignment));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeAssignment = createAsyncThunk(
  'assignments/removeAssignment',
  async (assignmentId: number, { dispatch }) => {
    await AssignmentService.deleteExistingAssignment(assignmentId);
    await dispatch(getAllAssignments(0));
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
    storeAssignment(state, action: PA<Assignment.AssignmentModel>) {
      state.assignment = action.payload;
    },
    storeAssignments(state, action: PA<Assignment.PagedModelAssignment[]>) {
      state.assignments = action.payload;
    },
    clearAssignment(state) {
      state.assignment = null;
    },
  },
});

export const { storeAssignment, storeAssignments, clearAssignment } =
  AssignmentSlice.actions;

const assignmentReducer = AssignmentSlice.reducer;

export default assignmentReducer;
