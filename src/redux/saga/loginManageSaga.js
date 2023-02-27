import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  loginFailute,
  loginRequest,
  loginSuccess,
} from "../../pages/Login/LoginManageSlice";
import { loginService } from "../../services/loginService";
import { STATUS_CODE, USER_LOGIN } from "../../ultil/settingSystem";

function* login(action) {
  yield put(showLoading());
  try {
    let infoLogin = yield call(() => {
      return loginService.login(action.payload.userLogin);
    });
    if (infoLogin.status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(USER_LOGIN, JSON.stringify(infoLogin.data));
      yield put(loginSuccess(infoLogin.data.userLogin));
        action.payload.navigate("/dashboard/employee");
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Bạn đã đăng nhập thành công");
  } catch (error) {
    yield put(loginFailute(error));
    yield put(hideLoading());
  }
}
export function* followActionLogin() {
  yield takeLatest(loginRequest, login);
}
