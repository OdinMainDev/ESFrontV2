import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IReducers } from './models/reducer';
import userReducer from './slices/userSlice';

const reducers: ReducersMapObject<IReducers> = {
  userReducer: userReducer,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
