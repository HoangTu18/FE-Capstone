import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../ultil/stringUtil";
import TableService from "../../components/MyTable/TableService";
import { getServiceRequest } from "./ServiceManageSlice";
import ServiceAdd from "../../components/Service/ServiceAddPopup";
function ServiceManager() {
  const serviceTableHeadTab1 = [
    "Mã dịch vụ",
    "Tên dịch vụ",
    "Giá (VND)",
    "Trạng thái",
    "Hành động",
  ];

  const serviceTableHeadTab2 = [
    "Mã combo",
    "Tên combo",
    "Giá (VND)",
    "Trạng thái",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;

  const [query, setQuery] = useState("");

  const [createPopup, setCreatePopup] = useState(false);

  const dispatch = useDispatch();
  const dataServices = useSelector((state) => state.serviceManage.listService);

  useEffect(() => {
    dispatch(getServiceRequest());
  }, [dispatch]);

  const [tab, setTab] = useState("tab1");
  return (
    <div>
      {createPopup ? <ServiceAdd closeModel={setCreatePopup} /> : <></>}
      <AdminPage>
        <div className="tab-wrapper">
          <div className="tab-wrapper__header">
            <span
              className={tab === "tab1" ? "active" : ""}
              onClick={() => {
                setTab("tab1");
              }}
            >
              Dịch vụ
            </span>
            <span
              className={tab === "tab2" ? "active" : ""}
              onClick={() => {
                setTab("tab2");
              }}
            >
              Combo
            </span>
          </div>
          <div className="tab__body">
            <div className={tab === "tab1" ? "tab active" : "tab"}>
              <div className="toptable">
                <h1 style={{ marginLeft: "30px" }}>Danh sách dịch vụ</h1>
                <div className="topnav__right">
                  <div className="topnav__right-item">
                    <div
                      className="button"
                      onClick={() => setCreatePopup(!createPopup)}
                    >
                      Thêm dịch vụ +
                    </div>
                  </div>
                  <div className="topnav__right-item">
                    <div className="topnav__search">
                      <input
                        type="text"
                        placeholder="nhập tên dịch vụ để tìm..."
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <i className="bx bx-search"></i>
                    </div>
                  </div>
                  <div className="topnav__right-item"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card__body">
                      <TableService
                        limit="5"
                        headData={serviceTableHeadTab1}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={searchByName(
                          dataServices,
                          query,
                          "serviceName"
                        )}
                        renderBody={(item, index) => renderBody(item, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={tab === "tab2" ? "tab active" : "tab"}>
              <div className="toptable">
                <h1 style={{ marginLeft: "30px" }}>Danh sách combo</h1>
                <div className="topnav__right">
                  <div className="topnav__right-item">
                    <div className="button">Thêm combo +</div>
                  </div>
                  <div className="topnav__right-item">
                    <div className="topnav__search">
                      <input type="text" placeholder="" />
                      <i className="bx bx-search"></i>
                    </div>
                  </div>
                  <div className="topnav__right-item"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card__body">
                      <TableService
                        limit="5"
                        headData={serviceTableHeadTab2}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={[]}
                        renderBody={(item, index) => renderBody(item, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default ServiceManager;
