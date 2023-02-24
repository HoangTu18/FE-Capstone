import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/AccountManageSlice";
import custonmerManageReducer from "../pages/CustomerManager/CustomerManageSlice";
import restaurantManageReducer from "../pages/RestaurantManager/RestaurantManageSlice";
import orderManageReducer from "../pages/OrderManage/OrderManageSlice"
import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    accountManage: accountManageReducer,
    loading: loadingReducer,
    customerManage: custonmerManageReducer,
    restaurantManage: restaurantManageReducer,
    orderManage: orderManageReducer
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
