import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      state.token = action.payload;
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => { 
      state.error = action.payload;
    },
    clearError: (state, action) => { 
      state.error = action.payload;
    },
  }
});

export const { setToken, clearToken, setLoading, setError, clearError } = authSlice.actions;

export default authSlice.reducer;