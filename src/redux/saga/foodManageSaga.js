import { call, put, takeLatest } from "redux-saga/effects";

import {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailure,
  getCategoryRequest,
  getCategorySuccess,
  getCategorydFailure,
  updateFoodRequest,
  deleteFoodRequest,
  insertFoodRequest,
} from "../../pages/FoodManager/foodManageSlice";

import { getRegionRequest } from "../../pages/RegionManage/RegionManageSlice";

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
    yield put(getCategorydFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCategory() {
  yield takeLatest(getCategoryRequest, getCategory);
}

function* insertFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.insertFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      console.log(action.payload.cateId);
      let foodToCategory = yield call(() => {
        return foodService.addFoodtoCategory(
          listFood.data.id,
          action.payload.cateId
        );
      });
      if (foodToCategory.status === STATUS_CODE.SUCCESS) {
        let foodToRegion = yield call(() => {
          return foodService.addFoodtoRegion(
            listFood.data.id,
            action.payload.regionId
          );
        });
        if (foodToRegion.status === STATUS_CODE.SUCCESS) {
          yield put(hideLoading());
        }
      }
    }
    yield put(getFoodRequest());
    yield put(getRegionRequest());
    yield put(getCategoryRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionInsertFood() {
  yield takeLatest(insertFoodRequest, insertFood);
}

function* updateFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.updateFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      console.log(action.payload.cateId);
      let foodToCategory = yield call(() => {
        return foodService.addFoodtoCategory(
          listFood.data.id,
          action.payload.cateId
        );
      });
      if (foodToCategory.status === STATUS_CODE.SUCCESS) {
        let foodToRegion = yield call(() => {
          return foodService.addFoodtoRegion(
            listFood.data.id,
            action.payload.regionId
          );
        });
        if (foodToRegion.status === STATUS_CODE.SUCCESS) {
          yield put(hideLoading());
        }
      }
    }
    yield put(getFoodRequest());
    yield put(getRegionRequest());
    yield put(getCategoryRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateFood() {
  yield takeLatest(updateFoodRequest, updateFood);
}

function* deleteFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.deleteFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      yield put(getFoodRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeleteFood() {
  yield takeLatest(deleteFoodRequest, deleteFood);
}
