import { createSlice } from "@reduxjs/toolkit";

export const CustomerManageSlice = createSlice({
  name: "customerManage",
  initialState: {
    listCustomer: [],
  },
  reducers: {
    //Get All Customer
    getCustomerRequest: (state) => {
      return state;
    },
    getCustomerSuccess: (state, action) => {
      state.listCustomer = action.payload;
    },
    getCustomerFailure: (state) => {
      return state;
    },
    //Delete Customer
    deleteCustomerRequest: (state) => {},
    deleteCustomerFaiture: (state) => {
      return state;
    },
  },
});
export const {
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerFaiture,
} = CustomerManageSlice.actions;

export default CustomerManageSlice.reducer
