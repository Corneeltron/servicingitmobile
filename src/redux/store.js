import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import {authApi} from '../services/auth/authService';

export default configureStore({
  reducer: {
    auth: authSlice,
    // [authApi.reducerPath]: authApi.reducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware),
});
