import { createSlice } from "@reduxjs/toolkit";

export const restaurantManageSlice = createSlice({
  name: "restaurantManage",
  initialState: {
    listRestaurant: [],
    restaurantItem: {},
  },
  reducers: {
    // Get Restaurant
    getRestaurantRequest: (state) => {
      return state;
    },
    getRestaurantSuccess: (state, action) => {
      state.listRestaurant = action.payload;
    },
    getRestaurantFailure: (state) => {
      return state;
    },
    //Get Restaurant By Staff
    getRestaurantByStaffSuccess: (state, action) => {
      state.restaurantItem = action.payload;
    },
    // Create restaurant
    createRestaurantRequest: (state, action) => {},
    createRestaurantFaiture: (state) => {
      return state;
    },
    //Update Restaurant
    updateRestaurantRequest: (state, action) => {},
    updateRestaurantFailure: (state) => {
      return state;
    },
    //Delete Restaurant
    deleteRetaurantRequest: (state) => {},
    deleteRestaurantFailure: (state) => {
      return state;
    },
  },
});

export const {
  getRestaurantRequest,
  getRestaurantSuccess,
  getRestaurantFailure,
  getRestaurantByStaffSuccess,
  createRestaurantRequest,
  createRestaurantFaiture,
  updateRestaurantRequest,
  updateRestaurantFailure,
  deleteRetaurantRequest,
  deleteRestaurantFailure,
} = restaurantManageSlice.actions;

export default restaurantManageSlice.reducer;
