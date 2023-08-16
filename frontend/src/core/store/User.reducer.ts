import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { UserService } from '../../sdk';
import { User } from '../../sdk/@types/User';

interface UserState {
  list: User.PagedModelDetailed[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers: User.PagedModelDetailed = createAsyncThunk(
  'user/getAllUsers',
  async (
    { page, size }: { page?: number; size?: number },
    { rejectWithValue },
  ) => {
    try {
      return await UserService.getAllUsers({
        page: page,
        sort: ['asc'],
        size: size,
      });
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId: number, { dispatch }) => {
    await UserService.deleteExistingUser(userId);
    await dispatch(getAllUsers(0));
  },
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers, removeUser);
  const error = isRejected(getAllUsers, removeUser);
  const loading = isPending(getAllUsers, removeUser);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state) => {
      state.fetching = false;
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
