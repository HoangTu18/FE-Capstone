import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getRestaurantFailure,
  getRestaurantRequest,
  getRestaurantSuccess,
} from "../../pages/RestaurantManager/RestaurantManageSlice";
import { restaurantService } from "../../services/restaurantService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getRestaurant() {
  try {
    yield put(showLoading());
    let listRestaurant = yield call(() => {
      return restaurantService.getRestaurant();
    });
    if (listRestaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantSuccess(listRestaurant.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getRestaurantFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetRestaurant() {
  yield takeLatest(getRestaurantRequest, getRestaurant);
}
