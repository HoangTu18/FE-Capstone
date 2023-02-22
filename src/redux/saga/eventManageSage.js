import { call, put, takeLatest } from "redux-saga/effects";

import {
  getEventRequest,
  getEventSuccess,
  getEventFailure,
} from "../../pages/EventManager/eventManagerSlice";

import { eventService } from "../../services/eventService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getEvent() {
  try {
    yield put(showLoading());
    let listEvent = yield call(() => {
      return eventService.getEvent();
    });
    if (listEvent.status === STATUS_CODE.SUCCESS) {
      yield put(getEventSuccess(listEvent.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getEventFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetEvents() {
  yield takeLatest(getEventRequest, getEvent);
}
