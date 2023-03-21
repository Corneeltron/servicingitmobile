import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  userName: false,
  companySetUpId: null,
  authLevelId: null,
  employeeId: null,
  email: null,
  name: null,
  phone: null,
  authLevel: {
    id: null,
    authLevel1: null,
    authHeader: null,
  },
  companySetUp: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      (state.id = action.payload.id),
        (state.userName = action.payload.userName),
        (state.companySetUpId = action.payload.companySetUpId),
        (state.authLevelId = action.payload.authLevelId),
        (state.employeeId = action.payload.employeeId),
        (state.email = action.payload.email),
        (state.name = action.payload.name),
        (state.phone = action.payload.phone),
        (state.authLevel.id = action.payload.authLevel.id),
        (state.authLevel.authLevel1 = action.payload.authLevel.authLevel1),
        (state.authLevel.authHeader = action.payload.authLevel.authHeader),
        (state.companySetup = action.payload.companySetup);
    },
  },
});

export const {setUserInfo} = userSlice.actions;

export default userSlice.reducer;
