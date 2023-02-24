import { all } from "redux-saga/effects";
import * as accountManageSaga from "./accountManageSaga";
import * as customerSaga from "./customerManageSaga";
import * as restaurantSaga from "./restaurantManageSaga";
import * as orderSaga from "./orderManageSaga";
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
    customerSaga.followActionUpdateCustomer(),
    //Saga Restaurant
    restaurantSaga.followActionGetRestaurant(),
    //Saga Order
    orderSaga.followActionGetOrder(),
    orderSaga.followActionGetOrderById()
  ]);
}
