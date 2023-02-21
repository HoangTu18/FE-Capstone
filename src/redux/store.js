import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/AccountManageSlice";
import custonmerManageReducer from "../pages/CustomerManager/CustomerManageSlice"
import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    accountManage: accountManageReducer,
    loading: loadingReducer,
    customerManage: custonmerManageReducer
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
