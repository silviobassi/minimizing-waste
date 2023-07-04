import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../sdk/@types';
import { FileService } from '../../sdk/services';

type PA<T> = PayloadAction<T>;

interface AuthPhotoState {
  photo: User.Avatar | null;
  fetching: boolean;
}

const initialState: AuthPhotoState = {
  photo: null,
  fetching: false,
};

export const fetchUserPhoto = createAsyncThunk(
  'photo/fetchUser',
  async (userId: number, { rejectWithValue, dispatch }) => {
    try {
      const photo =  await FileService.getUserPhoto(userId);
      dispatch(storeUserPhoto(photo))
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

const authPhotoSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    storeUserPhoto(state, action: PA<User.Avatar>) {
      state.photo = action.payload;
    },
    clearUserPhoto(state) {
      state.photo = null;
    },
  },
});

export const { storeUserPhoto, clearUserPhoto } = authPhotoSlice.actions;

const authPhotoReducer = authPhotoSlice.reducer;

export default authPhotoReducer;
