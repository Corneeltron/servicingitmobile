import {configureStore} from '@reduxjs/toolkit';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';

export const reducers = {
  loading: loadingReducer,
  login: loginReducer
};

export default configureStore({
  reducer: reducers,
  devTools: true,
});
