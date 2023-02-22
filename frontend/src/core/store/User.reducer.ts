import { createAsyncThunk, createReducer, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { User } from '../../@types/User';
import UserService from '../../services/User.service';

interface UserState {
  list: User.CollectionDetailed[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers: User.CollectionDetailed = createAsyncThunk(
  'user/getAllUsers',
  async () => UserService.getAllUsers(),
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers);
  const error = isRejected(getAllUsers);
  const loading = isPending(getAllUsers);

  builder
  .addCase(getAllUsers.fulfilled, (state, action) => {
    state.list = action.payload
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
