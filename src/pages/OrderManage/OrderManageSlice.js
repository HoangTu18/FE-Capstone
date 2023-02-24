import { createSlice } from "@reduxjs/toolkit";

export const orderManageSlice = createSlice({
  name: "orderManage",
  initialState: {
    listOrder: [],
    orderItem: {},
    filterStatus: "deny",
  },
  reducers: {
    //Get Order
    getOrderRequest: (state) => {
      return state;
    },
    getOrderSuccess: (state, action) => {
      state.listOrder = action.payload;
    },
    getOrderFailure: (state) => {
      return state;
    },
    //Get Order By Id
    getOrderByIdRequest: (state) => {
      return state;
    },
    getOrderByIdSuccess: (state, action) => {
      state.orderItem = action.payload;
    },
    getOrderByIdFailure: (state) => {
      return state;
    },
    filterByStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderByIdFailure,
  filterByStatus,
} = orderManageSlice.actions;
export default orderManageSlice.reducer;
