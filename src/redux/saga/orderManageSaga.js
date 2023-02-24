import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getOrderByIdFailure,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
} from "../../pages/OrderManage/OrderManageSlice";
import { orderService } from "../../services/orderService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getOrder() {
  try {
    yield put(showLoading());
    let listOrder = yield call(() => {
      return orderService.getOrder();
    });
    if (listOrder.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderSuccess(listOrder.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getOrderFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetOrder() {
  yield takeLatest(getOrderRequest, getOrder);
}
function* getOrderById(action) {
  try {
    let order = yield call(() => {
      return orderService.getOrderById(action.payload);
    });
    if (order.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderByIdSuccess(order.data));
    }
  } catch (error) {
    yield put(getOrderByIdFailure(error));
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetOrderById() {
  yield takeLatest(getOrderByIdRequest, getOrderById);
}
