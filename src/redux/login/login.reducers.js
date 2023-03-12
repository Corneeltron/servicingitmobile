import {createReducer, current} from '@reduxjs/toolkit';
import { AppInitialState } from '../AppInitialState';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
} from './login.actions';

const initialState = AppInitialState.login;

export const loginReducer = createReducer(initialState, builder => {
  builder.addCase(recoverPassword, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
    builder.addCase(recoverPasswordSuccess, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: true,
        isRecoveringPassword: false,
      };
    }),
    builder.addCase(recoverPasswordFail, (currentState, action) => {
      return {
        ...currentState,
        error: action.payload,
        isRecoveredPassword: false,
        isRecoveringPassword: true,
      };
    });
});
