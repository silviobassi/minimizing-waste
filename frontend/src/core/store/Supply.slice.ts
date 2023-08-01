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
  async (page: number, { rejectWithValue, dispatch }) => {
    try {
      const supplies = await SupplyService.getAllSupplies({
        page: page,
        sort: ['asc'],
        size: 4,
      });
      dispatch(storeSupplies(supplies));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
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
