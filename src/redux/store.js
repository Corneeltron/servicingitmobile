import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import logger from 'redux-logger';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import scheduleReducer from './slices/scheduleSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['userReducer']
};

//refreshing the app will not persist user info here because of this blacklist

const combinedReducers = combineReducers({ authReducer, userReducer, scheduleReducer});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
  devTools: true,
});

export default store;