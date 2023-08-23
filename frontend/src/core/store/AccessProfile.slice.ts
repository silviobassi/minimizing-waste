import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, Sector } from '../../sdk/@types';
import { RoleService, SectorService } from '../../sdk/services';

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
    await dispatch(getAllRoles(0));
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
});

export const { storeRoles, clearRoles } = RoleSlice.actions;

const RoleReducer = RoleSlice.reducer;

export default RoleReducer;
