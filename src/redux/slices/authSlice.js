import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncStorage} from '@react-native-community/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {user: null, token: null},
  reducers: {
    setCredentials: (state, action) => {
      const {user, accessToken} = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
