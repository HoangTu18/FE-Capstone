import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import * as viewCustomers from "../../api/Customer/viewCustomers";

import TableCustomer from "../../components/MyTable/TableCustomer";
import CustomerCreate from "../../components/Customer/customercreate.component";
function CustomerManager() {
  const customerTableHead = [
    "Mã khách hàng",
    "Tên khách hàng",
    "Số điện thoại",
    "Địa chỉ",
    "Email",
    "Trạng thái",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.customerName}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      <td>{item.email}</td>
      <td>{item.status}</td>
      <td>{}</td>
    </tr>
  );

  const [dataCustomer, setDataCustomer] = useState([]);
  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  const searchByName = (data) => {
    return data?.filter((item) =>
      query.toLowerCase() === "hoạt động"
        ? item.theAccount?.status.toString().includes(true)
        : query.toLowerCase() === "không hoạt động"
        ? item.theAccount?.status.toString().includes(false)
        : item.customerName?.toLowerCase().includes(query.toLowerCase()) ||
          item.email?.toLowerCase().includes(query) ||
          item.customerId?.toString().includes(query) ||
          item.theAccount?.phoneNumber.includes(query) ||
          item.address?.toLowerCase().includes(query)
    );
  };
  useEffect(() => {
    const fetchApi = async () => {
      //loading = true
      const result = await viewCustomers.view();
      setDataCustomer(result);
      //loading = false
    };
    fetchApi();
  }, []);

  return (
    <div>
      {createPopup ? <CustomerCreate closeModel={setCreatePopup} /> : Fragment}
      <AdminPage>
        <div>
          <div className="toptable">
            <h1 style={{ marginLeft: "30px" }}>Danh sách khách hàng</h1>
            <div className="topnav__right">
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
              <div className="topnav__right-item">
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <TableCustomer
                    limit="5"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={searchByName(dataCustomer)}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default CustomerManager;
