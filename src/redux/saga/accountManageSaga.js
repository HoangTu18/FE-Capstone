import { call, put, take, takeLatest } from "redux-saga/effects";
import {
  createAccountRequest,
  deleteStaffRequest,
  getAccountFailure,
  getAccountRequest,
  getAccountSuccess,
  getRoleFailure,
  getRoleRequest,
  getRoleSuccess,
  updateStaffRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import { accountService } from "../../services/accountService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getAccount() {
  try {
    yield put(showLoading());
    let listAccount = yield call(() => {
      return accountService.getStaff();
    });
    if (listAccount.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountSuccess(listAccount.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getAccountFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActiongetAccount() {
  yield takeLatest(getAccountRequest, getAccount);
}

function* getRole() {
  try {
    let listRole = yield call(() => {
      return accountService.getRole();
    });
    if (listRole.status === STATUS_CODE.SUCCESS) {
      yield put(getRoleSuccess(listRole.data));
    }
  } catch (error) {
    yield put(getRoleFailure(error));
  }
}
export function* followActionGetRole() {
  yield takeLatest(getRoleRequest, getRole);
}
function* createStaff(action) {
  try {
    yield put(showLoading());
    console.log("ACTION PAYLOAD", JSON.stringify(action.payload));
    let staff = yield call(() => {
      return accountService.createStaff(action.payload);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      console.log("STAFF SAGA", staff);
      yield put(getAccountRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionCreateStaff() {
  yield takeLatest(createAccountRequest, createStaff);
}
function* updateStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return accountService.updateStaff(action.payload);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountRequest());
    }
    yield hideLoading();
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateStaff() {
  yield takeLatest(updateStaffRequest, updateStaff);
}
function* deleteStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return accountService.deleteStaff(action.payload);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionDeleteStaff() {
  yield takeLatest(deleteStaffRequest, deleteStaff);
}
