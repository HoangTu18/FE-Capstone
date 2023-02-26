import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/AccountManageSlice";
import custonmerManageReducer from "../pages/CustomerManager/CustomerManageSlice";
import eventManageReducer from "../pages/EventManager/eventManagerSlice";
import foodManageReducer from "../pages/FoodManager/foodManageSlice";
import restaurantManageReducer from "../pages/RestaurantManager/RestaurantManageSlice";
import orderManageReducer from "../pages/OrderManage/OrderManageSlice";
import regionManageReducer from "../pages/RegionManage/RegionManageSlice";
import serviceManageReducer from "../pages/ServiceManage/ServiceManageSlice";
import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    loading: loadingReducer,
    accountManage: accountManageReducer,
    customerManage: custonmerManageReducer,
    eventManage: eventManageReducer,
    foodManage: foodManageReducer,
    restaurantManage: restaurantManageReducer,
    orderManage: orderManageReducer,
    regionManage: regionManageReducer,
    serviceManage: serviceManageReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
