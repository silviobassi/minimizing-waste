import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supply } from '../../sdk/@types';
import { SupplyService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

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
  async (search: Supply.Query, { rejectWithValue, dispatch }) => {
    try {
      const supplies = await SupplyService.getAllSupplies(search);
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
    await dispatch(getAllSupplies({page: 0, size: 4, sort: ['asc']}));
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

  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllSupplies,
      removeSupply,
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

export const { storeSupplies, clearSupplies } = SupplySlice.actions;

const SupplyReducer = SupplySlice.reducer;

export default SupplyReducer;
