import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/AccountManageSlice";
import custonmerManageReducer from "../pages/CustomerManager/CustomerManageSlice";
import eventManageReducer from "../pages/EventManager/eventManagerSlice";
import foodManageReducer from "../pages/FoodManager/foodManageSlice";
import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    loading: loadingReducer,
    accountManage: accountManageReducer,
    customerManage: custonmerManageReducer,
    eventManage: eventManageReducer,
    foodManage: foodManageReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
