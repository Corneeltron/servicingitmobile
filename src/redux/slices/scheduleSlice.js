import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: {
    firstName: null,
    lastName: null,
    startDate: null,
    endDate: null,
    title: null,
  },
  customer: {
    firstName: null,
    lastName: null,
    notes: null,
    phone: null,
    email: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
  }
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.employee.firstName = action.payload.employee.firstName;
      state.employee.lastName = action.payload.employee.lastName;
      state.employee.startDate = action.payload.startDate;
      state.employee.endDate = action.payload.endDate;
      state.employee.title = action.payload.title;
      state.customer.firstName = action.payload.customer.firstName;
      state.customer.lastName = action.payload.customer.lastName;
      state.customer.notes = action.payload.customer.notes;
      state.customer.phone = action.payload.customer.phone;
      state.customer.email = action.payload.customer.email;
      // state.customer.custAddress.address1 = action.payload.customer.custAddress[0].address1;
      // state.customer.custAddress.address2 = action.payload.customer.custAddress[0].address2;
      // state.customer.custAddress.city = action.payload.customer.custAddress[0].city;
      // state.customer.custAddress.state = action.payload.customer.custAddress[0].state;
      // state.customer.custAddress.zip = action.payload.customer.custAddress[0].zip;
    },
  }
});

export const { setInfo } = scheduleSlice.actions;

export default scheduleSlice.reducer;
