import { createSlice } from "@reduxjs/toolkit";

export const restaurantManageSlice = createSlice({
  name: "restaurantManage",
  initialState: {
    listRestaurant: [],
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
    // Create restaurant
    creatRestaurantRequest: (state, action) => {},
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
  creatRestaurantRequest,
  createRestaurantFaiture,
  updateRestaurantRequest,
  updateRestaurantFailure,
  deleteRetaurantRequest,
  deleteRestaurantFailure,
} = restaurantManageSlice.actions;

export default restaurantManageSlice.reducer;
