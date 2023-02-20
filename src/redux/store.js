import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/accountManageSlice";
import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    accountManage: accountManageReducer,
    loading: loadingReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
