import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission, Role } from '../../sdk/@types';
import { PermissionService, RoleService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface RoleState {
  list: Role.CollectionDetailed | [];
  fetching: boolean;
}

const initialState: RoleState = {
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

export const associateRoleToUser = createAsyncThunk(
  'roles/associateRoleToUser',
  async (
    { userId, roleId }: { userId: number; roleId: number },
    { rejectWithValue, dispatch },
  ) => {
    await RoleService.associateRoleToUser(userId, roleId);
    await dispatch(getAllRoles(0));
  },
);

export const disassociateRoleToUser = createAsyncThunk(
  'roles/disassociateRoleToUser',
  async (
    { userId, roleId }: { userId: number; roleId: number },
    { rejectWithValue, dispatch },
  ) => {
    await RoleService.disassociateRoleToUser(userId, roleId);
    await dispatch(getAllRoles(0));
  },
);


const RoleSlice = createSlice({
  initialState,
  name: 'roles',
  reducers: {
    storeRoles(
      state,
      action: PA<Permission.CollectionDetailedModel[]>,
    ) {
      state.list = action.payload;
    },
    clearRoles(state) {
      state.list = [];
    },
  },
});

export const { storeRoles, clearRoles } =
  RoleSlice.actions;

const RoleReducer = RoleSlice.reducer;

export default RoleReducer;
