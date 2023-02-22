import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableStaff from "../../components/MyTable/TableStaff";
import UserCreate from "../../components/User/UserCreatePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAccountRequest } from "./AccountManageSlice";
function AccountManager() {
  const staffTableHead = [
    "Mã nhân viên",
    "Tên nhân viên",
    "Chức danh",
    "Trạng thái",
    "Số điện thoại",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>#{item.id}</td>
      <td>{item.name}</td>
      <td>{item.role}</td>
      <td>{item.status}</td>
      <td>{item.phone}</td>
      <td></td>
    </tr>
  );
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.accountManage.listAccount);
  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  const searchByName = (data) => {
    return data.filter((item) =>
      query.toLowerCase() === "hoạt động"
        ? item.staffStatus?.toString().includes(true)
        : query.toLowerCase() === "không hoạt động"
        ? item.staffStatus.toString().includes(false)
        : item.staffFullName?.toLowerCase().includes(query.toLowerCase()) ||
          item.theAccountForStaff?.phoneNumber.includes(query) ||
          item.staffId?.toString().includes(query)
    );
  };
  useEffect(() => {
    dispatch(getAccountRequest());
  }, [dispatch]);

  return (
    <div>
      {createPopup ? <UserCreate closeModel={setCreatePopup} /> : Fragment}

      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách nhân viên</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm nhân viên +
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
                <TableStaff
                  limit="5"
                  headData={staffTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={searchByName(staffList)}
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

export default AccountManager;
