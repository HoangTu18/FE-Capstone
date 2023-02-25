import { all } from "redux-saga/effects";
import * as accountManageSaga from "./accountManageSaga";
import * as customerSaga from "./customerManageSaga";
import * as eventSaga from "./eventManageSage";
import * as foodSaga from "./foodManageSaga";
import * as restaurantSaga from "./restaurantManageSaga";
import * as orderSaga from "./orderManageSaga";
import * as regionSaga from "./regionManageSaga";
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
    eventSaga.followActioninsertEvents(),
    eventSaga.followActionUpdateEvent(),
    eventSaga.followActionDeleteEvent(),
    //Saga Food
    foodSaga.followActiongetFoods(),
    foodSaga.followActiongetCategory(),
    foodSaga.followActionUpdateFood(),
    foodSaga.followActionDeleteFood(),
    foodSaga.followActionInsertFood(),
    customerSaga.followActionUpdateCustomer(),
    //Saga Restaurant
    restaurantSaga.followActionGetRestaurant(),
    //Saga Order
    orderSaga.followActionGetOrder(),
    orderSaga.followActionGetOrderById(),
    //Sage Region
    regionSaga.followActiongetRegions(),
  ]);
}
