import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableFood from "../../components/MyTable/TableFood";
import "./foodmanager.style.scss";
import TableCombo from "../../components/MyTable/TableCombo";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequest } from "./foodManageSlice";
import { getRegionRequest } from "../RegionManage/RegionManageSlice";
import FoodAdd from "../../components/Food/FoodAddPopup";
function FoodManager() {
  const foodTableHeadTab1 = [
    "Mã món ăn",
    "Tên món ăn",
    "Giá (VND)",
    "Loại",
    "Trạng thái",
    "Hành động",
  ];

  const foodTableHeadTab2 = [
    "Mã combo",
    "Tên combo",
    "Giá (VND)",
    "Category",
    "Trạng thái",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.foodName}</td>
      <td>{item.price}</td>
      <td>{item.foodName}</td>
      <td>{item.status}</td>
    </tr>
  );

  const [query, setQuery] = useState("");
  const searchByName = (data) => {
    return data?.filter(
      (item) =>
        item.foodName?.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(query)
    );
  };
  const [createPopup, setCreatePopup] = useState(false);

  const dispatch = useDispatch();
  const dataFoods = useSelector((state) => state.foodManage.listFood);
  const listCate = useSelector((state) => state.foodManage.listCategory);
  const listRegion = useSelector((state) => state.regionManage.listRegion);

  useEffect(() => {
    dispatch(getFoodRequest());
    // dispatch(getRegionRequest());
  }, [dispatch]);

  const [tab, setTab] = useState("tab1");
  return (
    <div>
      {createPopup ? (
        <FoodAdd
          closeModel={setCreatePopup}
          listCate={listCate}
          listRegion={listRegion}
        />
      ) : (
        <></>
      )}
      <AdminPage>
        <div className="tab-wrapper">
          <div className="tab-wrapper__header">
            <span
              className={tab === "tab1" ? "active" : ""}
              onClick={() => {
                setTab("tab1");
              }}
            >
              Món lẻ
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
                <h1 style={{ marginLeft: "30px" }}>Danh sách món</h1>
                <div className="topnav__right">
                  <div className="topnav__right-item">
                    <div
                      className="button"
                      onClick={() => setCreatePopup(!createPopup)}
                    >
                      Thêm món +
                    </div>
                  </div>
                  <div className="topnav__right-item">
                    <div className="topnav__search">
                      <input
                        type="text"
                        placeholder=""
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
                      <TableFood
                        limit="5"
                        headData={foodTableHeadTab1}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={searchByName(dataFoods)}
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
                      <TableCombo
                        limit="5"
                        headData={foodTableHeadTab2}
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

export default FoodManager;
