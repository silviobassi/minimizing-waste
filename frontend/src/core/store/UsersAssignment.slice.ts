import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../sdk/@types';
import { UserService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface UsersAssignmentState {
  list: User.PagedModelUserAssigned[] | [];
  fetching: boolean;
}

const initialState: UsersAssignmentState = {
  list: [],
  fetching: false,
};

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
  },
});

export const { storeUsersAssignment, clearUsersAssignment } =
  UsersAssignmentSlice.actions;

const UsersAssignmentReducer = UsersAssignmentSlice.reducer;

export default UsersAssignmentReducer;
