import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../app/api/apiSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
