import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supply } from '../../sdk/@types';
import { SupplyMovementService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface SupplyMovementState {
  list: Supply.PagedModelSupplyMovementModel | [];
  fetching: boolean;
}

const initialState: SupplyMovementState = {
  list: [],
  fetching: false,
};

export const getAllSuppliesMovements = createAsyncThunk(
  'supplies-movements/getAllSuppliesMovements',
  async (page: number, { rejectWithValue, dispatch }) => {
    try {
      const movements = await SupplyMovementService.getAllSuppliesMovement({
        page: page,
        sort: ['asc'],
        size: 4,
      });
      dispatch(storeSuppliesMovements(movements));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeSupplyMovement = createAsyncThunk(
  'supplies-movements/removeSupplyMovement',
  async (supplyMovementId: number, { dispatch }) => {
    await SupplyMovementService.deleteExistingSupplyMovement(supplyMovementId);
    await dispatch(getAllSuppliesMovements(0));
  },
);

export const vacateSupplyMovement = createAsyncThunk(
  'supplies-movements/vacateSupplyMovement',
  async (supplyMovementId: number, { dispatch }) => {
    await SupplyMovementService.vacateSupplyMovement(supplyMovementId);
    await dispatch(getAllSuppliesMovements(0));
  },
);

const SupplyMovementSlice = createSlice({
  initialState,
  name: 'suppliesMovements',
  reducers: {
    storeSuppliesMovements(state, action: PA<Supply.PagedModelSupplyMovementModel[]>) {
      state.list = action.payload;
    },
    clearSuppliesMovements(state) {
      state.list = [];
    },
  },
});

export const { storeSuppliesMovements, clearSuppliesMovements } = SupplyMovementSlice.actions;

const SupplyMovementReducer = SupplyMovementSlice.reducer;

export default SupplyMovementReducer;
