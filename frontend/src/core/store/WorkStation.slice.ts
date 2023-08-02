import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkStation } from '../../sdk/@types';
import { WorkStationService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface WorkStationState {
  list: WorkStation.Collection | [];
  fetching: boolean;
}

const initialState: WorkStationState = {
  list: [],
  fetching: false,
};

export const getAllWorkStations = createAsyncThunk(
  'work-stations/getAllWorkStations',
  async (page: number, { rejectWithValue, dispatch }) => {
    try {
      const workStations = await WorkStationService.getAllWorkStations({
        page: page,
        size: 4,
        sort: ['asc'],
      });
      dispatch(storeWorkStations(workStations));
    } catch (error: any) {
      return rejectWithValue({ ...error });
    }
  },
);

export const removeWorkStation = createAsyncThunk(
  'work-stations/removeWorkStation',
  async (workStationId: number, { dispatch }) => {
    await WorkStationService.deleteExistingWorkStation(workStationId);
    await dispatch(getAllWorkStations(0));
  },
);

const WorkStationSlice = createSlice({
  initialState,
  name: 'workStations',
  reducers: {
    storeWorkStations(state, action: PA<WorkStation.Collection[]>) {
      state.list = action.payload;
    },
    clearWorkStations(state) {
      state.list = [];
    },
  },
});

export const { storeWorkStations, clearWorkStations } =
  WorkStationSlice.actions;

const WorkStationReducer = WorkStationSlice.reducer;

export default WorkStationReducer;
