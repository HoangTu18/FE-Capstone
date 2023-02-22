import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableEvent from "../../components/MyTable/TableEvent";
import { getEventRequest } from "./eventManagerSlice";

function EventManager() {
  const restaurantTableHead = [
    "Mã sự kiện",
    "Tên sự kiện",
    "Các món ăn",
    "Trạng thái",
    "Thời gian",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  );

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  // const searchByName = (data) => {
  //   return data.filter((item) =>
  //     query.toLowerCase() === "hoạt động"
  //       ? item.status?.toString().includes(true)
  //       : query.toLowerCase() === "không hoạt động"
  //       ? item.status.toString().includes(false)
  //       : item.restaurantName?.toLowerCase().includes(query.toLowerCase()) ||
  //         item.restaurantNumber.includes(query) ||
  //         item.restaurantId?.toString().includes(query)
  //   );
  // };

  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventManage.listEvent);
  console.log(eventList);
  useEffect(() => {
    dispatch(getEventRequest());
  }, [dispatch]);

  return (
    <div>
      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách sự kiện</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm sự kiện +
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
                <TableEvent
                  limit="5"
                  headData={restaurantTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={(eventList)}
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

export default EventManager;
