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
      notice,
      assignmentId,
      employeeResponsibleId,
      page,
    }: {
      notice: Assignment.AssignmentNotificationInput;
      assignmentId: number;
      employeeResponsibleId: number;
      page: number;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.associateEmployee(
        notice,
        assignmentId,
        employeeResponsibleId,
      );
      await dispatch(getAssignment(assignmentId));
      await dispatch(
        getAllUsersAssignmentAssign({ page, assigned: false, assignmentId }),
      );
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const disassociateEmployee = createAsyncThunk(
  'users/disassociateEmployee',
  async (
    {
      notice,
      assignmentId,
      employeeResponsibleId,
      page,
    }: {
      notice: Assignment.AssignmentNotificationInput;
      assignmentId: number;
      employeeResponsibleId: number;
      page: number;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await AssignmentService.disassociateEmployee(
        notice,
        assignmentId,
        employeeResponsibleId,
      );
      await dispatch(getAssignment(assignmentId));
      await dispatch(
        getAllUsersAssignmentAssign({ page, assigned: true, assignmentId }),
      );
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
      page,
      assigned,
      assignmentId,
    }: { page: number; assigned: boolean; assignmentId: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const usersAssignment = await UserService.getAllUsersAssigned(
        {
          page: page,
          sort: ['asc'],
          size: 4,
          assigned: assigned,
        },
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
