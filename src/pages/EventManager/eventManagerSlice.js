import { createSlice } from "@reduxjs/toolkit";

export const eventManageSlice = createSlice({
  name: "eventManage",
  initialState: {
    listEvent: [],
    isLoading: false,
  },
  reducers: {
    //Get All Event
    getEventRequest: (state) => {
      return state;
    },
    getEventSuccess: (state, action) => {
      state.listEvent = action.payload;
      state.isLoading = false;
    },
    getEventFailure: (state) => {
      return state;
    },
  },
});

export const { getEventRequest, getEventSuccess, getEventFailure } =
  eventManageSlice.actions;

export default eventManageSlice.reducer;
