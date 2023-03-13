import {createAction} from '@reduxjs/toolkit';

export const recoverPassword = createAction('[Recover password]');
export const recoverPasswordSuccess = createAction(
  '[Recover password] success',
);
export const recoverPasswordFail = createAction(
  '[Recover password] fail',
  error => ({payload: error}),
);
export const recoverPasswordReset = createAction("[Recover password] reset");

export const login = createAction("[Login]");
export const loginSuccess = createAction("[Login] success", (user) => ({payload: user}));
export const loginFail = createAction("[Login] fail", (err) => ({payload: err}));
export const logout = createAction("[Login] logout");
