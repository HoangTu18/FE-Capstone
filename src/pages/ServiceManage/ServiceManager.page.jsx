import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableRestaurant from "../../components/MyTable/TableRestaurant";
import { useDispatch, useSelector } from "react-redux";
function ServiceManager() {
  const dispatch = useDispatch();
  const listRestaurant = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );
  const restaurantTableHead = [
    "Mã dịch vụ",
    "Tên dịch vụ",
    "Đơn vị",
    "Giá (VND)",
    "Trạng thái",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>#{item.restaurantId}</td>
      <td>{item.restaurantName}</td>
      <td>{item.restaurantNumber}</td>
      <td>{item.restaurantLocation.split(",")[3]}</td>
      {item.status ? (
        <td className="status green">Hoạt động</td>
      ) : (
        <td className="status red">Không hoạt động</td>
      )}
      <td>
        <Icon className="icon" icon="bx:show-alt" />
        <Icon className="icon" icon="bx:bx-edit-alt" />
        <Icon className="icon" icon="material-symbols:delete-outline-rounded" />
      </td>
    </tr>
  );

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {}, [dispatch]);

  return (
    <div>
      <AdminPage>
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
                <TableRestaurant
                  limit="5"
                  headData={restaurantTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listRestaurant}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default ServiceManager;
