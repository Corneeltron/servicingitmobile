import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {loadingReducer} from './loading/loading.reducers';
import {loginReducer} from './login/login.reducers';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import logger from 'redux-logger';
import authReducer from './slices/authSlice';


// export const reducers = combineReducers({
//   login: loginReducer,
// });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  devTools: true,
});

export default store;