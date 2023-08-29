import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sector } from '../../sdk/@types';
import { SectorService } from '../../sdk/services';
import getThunkStatus from '../utils/getThunkStatus';

type PA<T> = PayloadAction<T>;

interface SectorState {
  list: Sector.Collection | [];
  fetching: boolean;
}

const initialState: SectorState = {
  list: [],
  fetching: false,
};

export const getAllSectors = createAsyncThunk(
  'sectors/getAllSectors',
  async (search: Sector.Query, { rejectWithValue, dispatch }) => {
    try {
      const sectors = await SectorService.getAllSectors(search);
      dispatch(storeSectors(sectors));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeSector = createAsyncThunk(
  'sectors/removeSector',
  async (sectorId: number, { dispatch }) => {
    await SectorService.deleteExistingSector(sectorId);
    await dispatch(getAllSectors({}));
  },
);

const SectorSlice = createSlice({
  initialState,
  name: 'sectors',
  reducers: {
    storeSectors(state, action: PA<Sector.Collection[]>) {
      state.list = action.payload;
    },
    clearSectors(state) {
      state.list = [];
    },
  },

  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllSectors,
      removeSector,
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

export const { storeSectors, clearSectors } = SectorSlice.actions;

const SectorReducer = SectorSlice.reducer;

export default SectorReducer;
