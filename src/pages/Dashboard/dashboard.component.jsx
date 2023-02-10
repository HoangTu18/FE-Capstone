import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardItem from "../../components/DashboardItem/dashboarditem.component";
import "./dashboard.style.scss";
function Dashboard() {
  // const [work, setWork] = useState();
  const location = useLocation();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left__logo">
          <img src="/images/logo.png" alt="" />
          <h3>Tên hệ thống</h3>
        </div>

        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "employee" ? true : false
            }
            url={"employee"}
            text={"Danh sách nhân viên"}
            icon={<i className="fa fa-user-friends"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "customer" ? true : false
            }
            url={"customer"}
            text={"Danh sách khách hàng"}
            icon={<i className="fa fa-user-friends"></i>}
          />
          <DashboardItem
            isActive={location.pathname.split("/")[2] === "food" ? true : false}
            url={"food"}
            text={"Danh sách món"}
            icon={<i className="fa fa-utensils"></i>}
          />
        </div>
        <div className="footer">
          <hr />
          <div className="logout">
            <i className="fa fa-sign-out-alt"></i>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        </div>
      </div>
      <div className="dashboard__right">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
