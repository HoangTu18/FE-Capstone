import { call, put, takeLatest } from "redux-saga/effects";

import {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailure,
  getCategoryRequest,
  getCategorySuccess,
  getCategorydFailure,
} from "../../pages/FoodManager/foodManageSlice";

import { foodService } from "../../services/foodService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getFood() {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.getFood();
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      yield put(getFoodSuccess(listFood.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getFoodFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetFoods() {
  yield takeLatest(getFoodRequest, getFood);
}

function* getCategory() {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.getCategory();
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      yield put(getCategorySuccess(listFood.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getFoodFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCategory() {
  yield takeLatest(getCategoryRequest, getCategory);
}
