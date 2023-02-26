import { createSlice } from "@reduxjs/toolkit";

export const ServiceManageSlice = createSlice({
  name: "ServiceManage",
  initialState: {
    listService: [],
  },
  reducers: {
    // Get Service
    getServiceRequest: (state) => {
      return state;
    },
    getServiceSuccess: (state, action) => {
      state.listService = action.payload;
    },
    getServiceFailure: (state) => {
      return state;
    },
    // Create Service
    creatServiceRequest: (state, action) => {},
    createServiceFaiture: (state) => {
      return state;
    },
    //Update Service
    updateServiceRequest: (state, action) => {},
    updateServiceFailure: (state) => {
      return state;
    },
    //Delete Service
    deleteRetaurantRequest: (state) => {},
    deleteServiceFailure: (state) => {
      return state;
    },
  },
});

export const {
  getServiceRequest,
  getServiceSuccess,
  getServiceFailure,
  creatServiceRequest,
  createServiceFaiture,
  updateServiceRequest,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceFailure,
} = ServiceManageSlice.actions;

export default ServiceManageSlice.reducer;
