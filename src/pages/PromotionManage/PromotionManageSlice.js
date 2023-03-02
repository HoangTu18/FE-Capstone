import { createSlice } from "@reduxjs/toolkit";

export const promotionManageSlice = createSlice({
  name: "promotionManage",
  initialState: {
    listPromotion: [],
  },
  reducers: {
    getPromotionRequest: (state) => {
      return state;
    },
    getPromotionSuccess: (state, action) => {
      state.listPromotion = action.payload;
    },
    getPromotionFailure: (state) => {
      return state;
    },
    creatPromotionRequest: (state, action) => {},
    createPromotionFaiture: (state) => {
      return state;
    },
    updatePromotionRequest: (state, action) => {},
    updatePromotionFailure: (state) => {
      return state;
    },
    deletePromotionequest: (state) => {},
    deletePromotionFailure: (state) => {
      return state;
    },
  },
});

export const {
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,
  creatPromotionRequest,
  createPromotionFaiture,
  updatePromotionRequest,
  updatePromotionFailure,
} = promotionManageSlice.actions;

export default promotionManageSlice.reducer;
