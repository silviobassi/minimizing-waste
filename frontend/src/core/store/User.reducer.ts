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
  async (page: number, { rejectWithValue }) => {
    try {
      return await UserService.getAllUsers({
        sort: ['asc'],
        page: page,
        size: 4,
      });
    } catch (error: any ) {
      return rejectWithValue({ ...error });
    }
  },
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers);
  const error = isRejected(getAllUsers);
  const loading = isPending(getAllUsers);

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
