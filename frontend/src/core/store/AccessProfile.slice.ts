import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../sdk/@types';
import { RoleService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

type PA<T> = PayloadAction<T>;

interface AccessProfileState {
  list: Role.CollectionDetailed | [];
  fetching: boolean;
}

const initialState: AccessProfileState = {
  list: [],
  fetching: false,
};

export const getAllRoles = createAsyncThunk(
  'roles/getAllRoles',
  async (_: any, { rejectWithValue, dispatch }) => {
    try {
      const roles = await RoleService.getAllRoles();
      dispatch(storeRoles(roles));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeRoles = createAsyncThunk(
  'roles/removeRoles',
  async (roleId: number, { dispatch }) => {
    await RoleService.deleteExistingRole(roleId);
    await dispatch(getAllRoles({}));
  },
);

const RoleSlice = createSlice({
  initialState,
  name: 'roles',
  reducers: {
    storeRoles(state, action: PA<Role.CollectionDetailed[]>) {
      state.list = action.payload;
    },
    clearRoles(state) {
      state.list = [];
    },
  },

  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllRoles,
      removeRoles,
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


export const { storeRoles, clearRoles } = RoleSlice.actions;

const RoleReducer = RoleSlice.reducer;

export default RoleReducer;
