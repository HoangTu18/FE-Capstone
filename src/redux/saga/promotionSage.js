import { call, put, takeLatest } from "redux-saga/effects";

import {
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,
  creatPromotionRequest,
  createPromotionFaiture,
  updatePromotionRequest,
  updatePromotionFailure,
} from "../../pages/PromotionManage/PromotionManageSlice";

import { promotionService } from "../../services/promotionService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getPromotion() {
  try {
    yield put(showLoading());
    let listPromotion = yield call(() => {
      return promotionService.getPromotion();
    });
    if (listPromotion.status === STATUS_CODE.SUCCESS) {
      yield put(getPromotionSuccess(listPromotion.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getPromotionFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetPromotions() {
  yield takeLatest(getPromotionRequest, getPromotion);
}
