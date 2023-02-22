import { createSlice } from "@reduxjs/toolkit";

export const FoodManageSlice = createSlice({
  name: "foodManage",
  initialState: {
    listFood: [],
    listCategory: [],
  },
  reducers: {
    //Get All Food
    getFoodRequest: (state) => {
      return state;
    },
    getFoodSuccess: (state, action) => {
      state.listFood = action.payload;
    },
    getFoodFailure: (state) => {
      return state;
    },
    //Get All Category
    getCategoryRequest: (state) => {
      return state;
    },
    getCategorySuccess: (state, action) => {
      state.listCategory = action.payload;
    },
    getCategorydFailure: (state) => {
      return state;
    },
  },
});
export const {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailure,
  getCategoryRequest,
  getCategorySuccess,
  getCategorydFailure,
} = FoodManageSlice.actions;

export default FoodManageSlice.reducer;
