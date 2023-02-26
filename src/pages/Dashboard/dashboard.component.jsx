import React from "react";
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
          <h3>TFS System</h3>
        </div>

        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "employee" ? true : false
            }
            url={"employee"}
            text={"Danh sách nhân viên"}
            icon={<i className="fa-solid fa-users"></i>}
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
            icon={<i className="fa-solid fa-rectangle-list"></i>}
          />

          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "restaurant" ? true : false
            }
            url={"restaurant"}
            text={"Quản lý nhà hàng"}
            icon={<i className="fa-solid fa-torii-gate"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "event" ? true : false
            }
            url={"event"}
            text={"Quản lý Sự kiện"}
            icon={<i className="fa-regular fa-calendar"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "order" ? true : false
            }
            url={"order"}
            text={"Quản lí đơn hàng"}
            icon={<i className="fa-solid fa-receipt"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "service" ? true : false
            }
            url={"service"}
            text={"Quản lý dịch vụ"}
            icon={<i className="fa-solid fa-bell-concierge"></i>}
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
