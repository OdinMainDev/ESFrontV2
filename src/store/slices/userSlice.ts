import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMeUserApi } from '@/shared/api/userApi';
import { IInitialUser } from '../models/user';
import { IUser } from '@/shared/models/interfaces/user';

import Cookies from 'js-cookie';

const initialState: IInitialUser = {
  loading: false,
  isError: false,
  isAuth: !!Cookies.get('token'),
  user: null,
  role: 0,
};

export const getMeUser = createAsyncThunk('getMeUserApi', async () => {
  const data = await getMeUserApi();
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMeUser.fulfilled, (state, action: PayloadAction<IUser | null>) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(getMeUser.rejected, (state) => {
      state.loading = false;
      state.isError = true;
      state.isAuth = false;
      state.role = 0;
    });
  },
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.role = 0;
      Cookies.remove('token');
    },
    setRole(state, action: PayloadAction<0 | 1 | 2>) {
      state.role = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { logout, setIsAuth, setRole } = userSlice.actions;
export default userSlice.reducer;
