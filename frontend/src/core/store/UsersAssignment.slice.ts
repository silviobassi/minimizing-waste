import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assignment, User } from '../../sdk/@types';
import { AssignmentService, UserService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

type PA<T> = PayloadAction<T>;

interface UsersAssignmentState {
  list: User.PagedModelUserAssigned[] | [];
  assignment: Assignment.AssignmentModel;
  fetching: boolean;
}

const initialState: UsersAssignmentState = {
  list: [],
  assignment: null,
  fetching: false,
};

export const associateEmployee = createAsyncThunk(
  'users/associateEmployee',
  async (
    {
      assignmentId,
      employeeResponsibleId,
      search,
    }: {
      assignmentId: number;
      employeeResponsibleId: number;
      search: Assignment.Query;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.associateEmployee(
        assignmentId,
        employeeResponsibleId,
        search,
      );
      await dispatch(getAssignment(assignmentId));
      await dispatch(getAllUsersAssignmentAssign({ search, assignmentId }));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const disassociateEmployee = createAsyncThunk(
  'users/disassociateEmployee',
  async (
    {
      assignmentId,
      employeeResponsibleId,
      search,
    }: {
      assignmentId: number;
      employeeResponsibleId: number;
      search: Assignment.Query;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.disassociateEmployee(
        assignmentId,
        employeeResponsibleId,
        search,
      );
      await dispatch(getAssignment(assignmentId));
      await dispatch(getAllUsersAssignmentAssign({ search, assignmentId }));
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

export const getAllUsersAssignmentAssign = createAsyncThunk(
  'users/getAllUsersAssignmentAssign',
  async (
    {
      search,
      assignmentId,
    }: { search: Assignment.Query; assignmentId: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const usersAssignment = await UserService.getAllUsersAssigned(
        search,
        assignmentId,
      );
      dispatch(storeUsersAssignment(usersAssignment));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

const UsersAssignmentSlice = createSlice({
  initialState,
  name: 'usersAssignment',
  reducers: {
    storeUsersAssignment(state, action: PA<User.PagedModelUserAssigned[]>) {
      state.list = action.payload;
    },
    clearUsersAssignment(state) {
      state.list = [];
    },
    storeAssignment(state, action: PA<Assignment.AssignmentModel>) {
      state.assignment = action.payload;
    },
  },

  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      associateEmployee,
      disassociateEmployee,
      getAssignment,
      getAllUsersAssignmentAssign,
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

export const { storeAssignment, storeUsersAssignment, clearUsersAssignment } =
  UsersAssignmentSlice.actions;

const UsersAssignmentReducer = UsersAssignmentSlice.reducer;

export default UsersAssignmentReducer;
