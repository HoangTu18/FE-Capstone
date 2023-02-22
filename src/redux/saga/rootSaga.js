import { all } from "redux-saga/effects";
import * as accountManageSaga from "./accountManageSaga";
import * as customerSaga from "./customerManageSaga";
import * as eventSaga from "./eventManageSage";
export default function* rootSaga() {
  yield all([
    // Saga Staff
    accountManageSaga.followActiongetAccount(),
    accountManageSaga.followActionGetRole(),
    accountManageSaga.followActionCreateStaff(),
    accountManageSaga.followActionUpdateStaff(),
    accountManageSaga.followActionDeleteStaff(),
    //Saga Customer
    customerSaga.followActionGetCustomer(),
    customerSaga.folllowActionDeleteCustomer(),
    //Saga Event
    eventSaga.followActiongetEvents(),
  ]);
}
