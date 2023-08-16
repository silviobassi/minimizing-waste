import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supply } from '../../sdk/@types';
import { SupplyService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface SupplyState {
  list: Supply.PagedModelSummary | [];
  fetching: boolean;
}

const initialState: SupplyState = {
  list: [],
  fetching: false,
};

export const getAllSupplies = createAsyncThunk(
  'supplies/getAllSupplies',
  async (
    { page, size }: { page?: number; size?: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const supplies = await SupplyService.getAllSupplies({
        page: page,
        sort: ['asc'],
        size: size,
      });
      dispatch(storeSupplies(supplies));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeSupply = createAsyncThunk(
  'supplies/removeSupply',
  async (supplyId: number, { dispatch }) => {
    await SupplyService.deleteExistingSupply(supplyId);
    await dispatch(getAllSupplies({ page: 0, size: 4 }));
  },
);

const SupplySlice = createSlice({
  initialState,
  name: 'supplies',
  reducers: {
    storeSupplies(state, action: PA<Supply.PagedModelSummary[]>) {
      state.list = action.payload;
    },
    clearSupplies(state) {
      state.list = [];
    },
  },
});

export const { storeSupplies, clearSupplies } = SupplySlice.actions;

const SupplyReducer = SupplySlice.reducer;

export default SupplyReducer;
