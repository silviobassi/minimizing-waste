import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../sdk/@types';
import { RoleService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

type PA<T> = PayloadAction<T>;

interface RoleState {
  list: Role.CollectionSummary | [];
  fetching: boolean;
}

const initialState: RoleState = {
  list: [],
  fetching: false,
};

export const getAllRolesNotOrGranted = createAsyncThunk(
  'roles/getAllRolesNotOrGranted',
  async (
    { userId, roleParam }: { userId: number; roleParam: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const rolesNotOrGranted = await RoleService.getAllRolesAllNotOrGranted(
        userId,
        {
          role: roleParam,
        },
      );
      dispatch(storeRolesNotOrGranted(rolesNotOrGranted));
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
    await dispatch(
      getAllRolesNotOrGranted({ userId, roleParam: 'notGranted' }),
    );
  },
);

export const disassociateRoleToUser = createAsyncThunk(
  'roles/disassociateRoleToUser',
  async (
    { userId, roleId }: { userId: number; roleId: number },
    { rejectWithValue, dispatch },
  ) => {
    await RoleService.disassociateRoleToUser(userId, roleId);
    await dispatch(getAllRolesNotOrGranted({ userId, roleParam: 'granted' }));
  },
);

const RolesNotOrGrantedSlice = createSlice({
  initialState,
  name: 'rolesNotOrGranted',
  reducers: {
    storeRolesNotOrGranted(state, action: PA<Role.CollectionSummary[]>) {
      state.list = action.payload;
    },
    clearRolesNotOrGranted(state) {
      state.list = [];
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllRolesNotOrGranted,
      associateRoleToUser,
      disassociateRoleToUser,
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

export const { storeRolesNotOrGranted, clearRolesNotOrGranted } =
  RolesNotOrGrantedSlice.actions;

const RolesNotOrGrantedReducer = RolesNotOrGrantedSlice.reducer;

export default RolesNotOrGrantedReducer;
