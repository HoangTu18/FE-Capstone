import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../NotificationConfirm/NotificationConfirm";
import "./adminpage.style.scss";
import ProfileViewPopup from "./ViewProfilePopup";
import { USER_LOGIN } from "../../ultil/settingSystem";
import SettingViewPopup from "./ViewSettingPopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoleRequest } from "../../pages/AccountManager/AccountManageSlice";
function AdminPage({ children }) {
  const navigate = useNavigate();
  const [popupProfile, setPopupProfile] = useState(false);
  const [popupSetting, setPopupSetting] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    openNotification("success", "Thành Công", "Bạn đã thao tác thành công");
  };
  let staff = JSON.parse(localStorage.getItem(USER_LOGIN));

  // useCallback(() => {
  //   staff.current = JSON.parse(localStorage.getItem(USER_LOGIN));
  // }, []);

  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);

  useEffect(() => {
    dispatch(getRoleRequest());
  }, [dispatch]);
  const showProfile = () => {
    setPopupProfile(!popupProfile);
  };
  const showSetting = () => {
    setPopupSetting(!popupSetting);
  };
  return (
    <div className="admin-page">
      {popupProfile ? (
        <ProfileViewPopup
          closeModel={setPopupProfile}
          data={staff}
          listRole={listRole}
        />
      ) : (
        <></>
      )}
      {popupSetting ? (
        <SettingViewPopup closeModel={setPopupSetting} data={staff} />
      ) : (
        <></>
      )}
      <div className="admin-page__header">
        <h4>Hello, {staff.staffFullName}</h4>
        <div className="dropdown">
          <div className="dropdown__select">
            <img
              style={{ marginLeft: "30px" }}
              src={
                staff.staffAvatarUrl
                  ? staff.staffAvatarUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
            <span className="dropdown__text unselectable">
              {staff.staffFullName.split(" ")[
                staff.staffFullName.split(" ").length - 1
              ] +
                " " +
                staff.staffFullName.split(" ")[0]}
            </span>
            <i
              className="fa-sharp fa-solid fa-caret-down dropdown__caret"
              style={{ color: "black" }}
            ></i>
          </div>
          <ul className="dropdown__list">
            <li
              className="dropdown__item"
              onClick={() => {
                showProfile();
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span className="dropdown__text unselectable">
                Thông tin cá nhân
              </span>
            </li>
            <li
              className="dropdown__item"
              onClick={() => {
                showSetting();
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <span className="dropdown__text unselectable">Cài đặt</span>
            </li>
            <li className="dropdown__item">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="dropdown__text unselectable" onClick={logout}>
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="admin-page__body">{children}</div>
    </div>
  );
}

export default AdminPage;
