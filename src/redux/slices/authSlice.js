import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncStorage} from '@react-native-community/async-storage';

// initialize userToken from local storage
const userToken = async () => {
  let token = await AsyncStorage.getItem('userToken');
  console.log('asynctoken', token);
  try {
    return token;
  } catch {
    return null;
  }
};

const initialState = {
  loading: false,
  userInfo: null,
  userToken: userToken(),
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
  extraReducers: {},
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
