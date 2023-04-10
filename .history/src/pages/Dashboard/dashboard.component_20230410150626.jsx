import React, { useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardItem from "../../components/DashboardItem/dashboarditem.component";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import { USER_LOGIN } from "../../ultil/settingSystem";
import NotificationSound from "./sound/notification2.mp3";
import "./dashboard.style.scss";
import ReactHowler from "react-howler";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Dashboard() {
  const [count, setCount] = useState(1);
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState(0);
  const [cur, setCur] = useState(0);
  const location = useLocation();
  let staff = JSON.parse(localStorage.getItem(USER_LOGIN));
  const role = JSON.parse(localStorage.getItem(USER_LOGIN))?.theAccountForStaff
    .roleId;
  useEffect(() => {
    setCur(list.length);
    if (prev !== cur) {
      if (prev !== 0 || cur === 1) {
        pushNotifications(list[0]);
      }
    }
    const interval = setInterval(() => {
      fetchData();
      setCount((prevCount) => prevCount + 1);
      setPrev(list.length);
    }, 1000);
    // console.log(count);
    if (!isLogin) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    setCount(90);
    console.log("start");
  }, []);
  const fetchData = () => {
    axios
      .get(
        "https://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/notifications/byaccount/" +
          staff.theAccountForStaff.accountId
      )
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log(err.response.data);
      });
  };
  const handleSound = () => {
    console.log("check");
    return <ReactHowler src={NotificationSound} playing={true} />;
  };
  const check = () => {
    console.log(staff.theAccountForStaff.accountId);
  };
  const renderByAuth = () => {
    if (role === 2) {
      //ROLE ADMIN
      return (
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
        </div>
      );
    } else if (role === 1) {
      // ROLE OWNER
      return (
        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "overview" ? true : false
            }
            url={"overview"}
            text={"Tổng quan"}
            icon={<i className="fa-solid fa-chart-simple"></i>}
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
              location.pathname.split("/")[2] === "service" ? true : false
            }
            url={"service"}
            text={"Quản lý dịch vụ"}
            icon={<i className="fa-solid fa-bell-concierge"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "promotion" ? true : false
            }
            url={"promotion"}
            text={"Quản lý voucher"}
            icon={<i className="fa-solid fa-ticket-simple"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "category" ? true : false
            }
            url={"category"}
            text={"Quản lý danh mục"}
            icon={<i className="fa-solid fa-list"></i>}
          />
        </div>
      );
    } else if (role === 3) {
      //ROLE MANAGER
      return (
        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "overviewOfRes" ? true : false
            }
            url={"overviewOfRes"}
            text={"Tổng quan"}
            icon={<i className="fa-solid fa-chart-simple"></i>}
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
              location.pathname.split("/")[2] === "staffOfRestaurant"
                ? true
                : false
            }
            url={"staffOfRestaurant"}
            text={"Nhân viên nhà hàng"}
            icon={<i className="fa-solid fa-users"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "foodOfRes" ? true : false
            }
            url={"foodOfRes"}
            text={"Danh sách món"}
            icon={<i className="fa-solid fa-rectangle-list"></i>}
          />
        </div>
      );
    }
  };
  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left__logo">
          <img src="/images/logo.png" alt="" />
          <h3>TFS System</h3>
        </div>
        {renderByAuth()}
        <div
          onClick={() => {
            openNotification("warning", "Thông Báo", "Bạn có đơn hàng mới");
            if (role === 3) {
              // handleSound();
              check();
            }
          }}
        >
          askjhajkd
        </div>
      </div>
      <div className="dashboard__right">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
