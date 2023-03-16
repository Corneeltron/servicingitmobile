import {createReducer, current} from '@reduxjs/toolkit';
import {AppInitialState} from '../AppInitialState';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
  recoverPasswordReset,
  loginSuccess,
  login,
  loginFail,
  logout,
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
        isRecoveringPassword: false,
      };
    }),
    builder.addCase(recoverPasswordReset, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
      };
    }),
    builder.addCase(login, currentState => {
      return {
        ...currentState,
        error: null,
        isLoggedIn: false,
        isLoggingIn: true,
      };
    }),
    builder.addCase(loginSuccess, (currentState, action) => {
      return {
        ...currentState,
        isLoggedIn: true,
        isLoggingIn: false,
        token: action.payload.data.token
      };
    }),
    builder.addCase(loginFail, (currentState, action) => {
      return {
        ...currentState,
        isLoggedIn: false,
        isLoggingIn: false,
        error: action.payload,
      };
    }),
    builder.addCase(logout, currentState => {
      return {
        ...currentState,
        isLoggedIn: false,
        token: null,
      };
    });
});
