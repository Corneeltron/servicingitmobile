import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weekData: []
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.weekData = state.weekData.concat(action.payload);
    },
  }
});

export const { setInfo } = scheduleSlice.actions;

export default scheduleSlice.reducer;
