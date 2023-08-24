import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission } from '../../sdk/@types';
import { PermissionService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface PermissionState {
  list: Permission.CollectionDetailedModel | [];
  fetching: boolean;
}

const initialState: PermissionState = {
  list: [],
  fetching: false,
};

export const getAllPermissionsNotOrGranted = createAsyncThunk(
  'permissions/getAllPermissionsNotOrGranted',
  async (
    { roleId, permissionParam }: { roleId: number; permissionParam: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const permissionsNotOrGranted =
        await PermissionService.getAllPermissionsAllNotOrGranted(roleId, {
          permission: permissionParam,
        });
      dispatch(storePermissionsNotOrGranted(permissionsNotOrGranted));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const associatePermissionsToRole = createAsyncThunk(
  'permissions/associatePermissionsToRole',
  async (
    { roleId, permissionId }: { roleId: number; permissionId: number },
    { dispatch },
  ) => {
    await PermissionService.associatePermissionsToRole(roleId, permissionId);
    await dispatch(
      getAllPermissionsNotOrGranted({ roleId, permissionParam: 'notGranted' }),
    );
  },
);

export const disassociatePermissionsToRole = createAsyncThunk(
  'permissions/disassociatePermissionsToRole',
  async (
    { roleId, permissionId }: { roleId: number; permissionId: number },
    { dispatch },
  ) => {
    await PermissionService.disassociatePermissionsToRole(roleId, permissionId);
    await dispatch(
      getAllPermissionsNotOrGranted({ roleId, permissionParam: 'granted' }),
    );
  },
);

/*export const removeRoles = createAsyncThunk(
  'roles/removeRoles',
  async (roleId: number, { dispatch }) => {
    await RoleService.deleteExistingRole(roleId);
    await dispatch(getAllRoles(0));
  },
);*/

const PermissionsNotOrGrantedSlice = createSlice({
  initialState,
  name: 'permissionsNotOrGranted',
  reducers: {
    storePermissionsNotOrGranted(
      state,
      action: PA<Permission.CollectionDetailedModel[]>,
    ) {
      state.list = action.payload;
    },
    clearPermissionsNotOrGranted(state) {
      state.list = [];
    },
  },
});

export const { storePermissionsNotOrGranted, clearPermissionsNotOrGranted } =
  PermissionsNotOrGrantedSlice.actions;

const PermissionsNotOrGrantedReducer = PermissionsNotOrGrantedSlice.reducer;

export default PermissionsNotOrGrantedReducer;
