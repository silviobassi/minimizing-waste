import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sector } from '../../sdk/@types';
import { SectorService } from '../../sdk/services';

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
  async (_: any, { rejectWithValue, dispatch }) => {
    try {
      const sectors = await SectorService.getAllSectors();
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
    await dispatch(getAllSectors(0));
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
});

export const { storeSectors, clearSectors } = SectorSlice.actions;

const SectorReducer = SectorSlice.reducer;

export default SectorReducer;
