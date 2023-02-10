import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableFood from "../../components/MyTable/TableFood";
import * as viewFoods from "../../api/Food/viewFoods";
import "./foodmanager.style.scss";
import TableCombo from "../../components/MyTable/TableCombo";
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

  const [dataFoods, setDataFoods] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      //loading = true
      const result = await viewFoods.view();
      console.log(result);
      setDataFoods(result);
      //loading = false
    };
    fetchApi();
  }, []);

  const [tab, setTab] = useState("tab1");
  return (
    <div>
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
                    <div className="button">Thêm món +</div>
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
                      <TableFood
                        limit="5"
                        headData={foodTableHeadTab1}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={dataFoods}
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
                        bodyData={dataFoods}
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
