import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncStorage} from '@react-native-community/async-storage';

// Auth actions
const backendURL = 'http://localhost:5001';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({firstname, email, password}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `${backendURL}/api/user/register`,
        {firstname, email, password},
        config,
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({firstname, email, password}, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post(
        `${backendURL}/api/user/login`,
        {firstname, email, password},
        config,
      );
      // store user's token in local storage
      AsyncStorage.setItem('userToken', data.access_token);
      console.log('usertoken', data.access_token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

// initialize userToken from local storage
// const userToken = async () => {
//   let token = await AsyncStorage.getItem('userToken');
//   console.log('asynctoken', token);
//   try {
//     return token;
//   } catch {
//     return null;
//   }
// };

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: state => {
    //   // ...logout reducer
    // },
    // setCredentials: (state, {payload}) => {
    //   state.userInfo = payload;
    // },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    // register user reducer...
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export default authSlice.reducer;
