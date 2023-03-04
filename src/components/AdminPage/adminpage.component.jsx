import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../NotificationConfirm/NotificationConfirm";
import "./adminpage.style.scss";
import ProfileViewPopup from "./ViewProfilePopup";
import { USER_LOGIN } from "../../ultil/settingSystem";
function AdminPage({ children }) {
  const navigate = useNavigate();
  const [popupProfile, setPopupProfile] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    openNotification("success", "Thành Công", "Bạn đã thao tác thành công");
  };
  const staff = useRef(JSON.parse(localStorage.getItem(USER_LOGIN)));
  const showProfile = () => {
    setPopupProfile(!popupProfile);
  };

  return (
    <div className="admin-page">
      {popupProfile ? <ProfileViewPopup closeModel={setPopupProfile} /> : <></>}
      <div className="admin-page__header">
        <h4>Hello, {staff.current.staffFullName}</h4>
        <div className="dropdown">
          <div className="dropdown__select">
            <img
              style={{ marginLeft: "30px" }}
              src={
                staff.current.staffAvatarUrl
                  ? staff.current.staffAvatarUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
            <span className="dropdown__text unselectable">
              {staff.current.staffFullName.split(" ")[
                staff.current.staffFullName.split(" ").length - 1
              ] +
                " " +
                staff.current.staffFullName.split(" ")[0]}
            </span>
            <i
              class="fa-sharp fa-solid fa-caret-down dropdown__caret"
              style={{ color: "black" }}
            ></i>
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__item">
              <i className="fa-solid fa-user"></i>
              <span
                className="dropdown__text unselectable"
                onClick={() => {
                  showProfile();
                }}
              >
                Thông tin cá nhân
              </span>
            </li>
            <li className="dropdown__item">
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
