import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import * as viewCustomers from "../../api/Customer/viewCustomers";

import TableCustomer from "../../components/MyTable/TableCustomer";

function CustomerManager() {
  const customerTableHead = [
    "Mã khách hàng",
    "Tên khách hàng",
    "Số điện thoại",
    "Địa chỉ",
    "Email",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      <td>{item.email}</td>
      <td>{item.status}</td>
    </tr>
  );

  const [dataCustomer, setDataCustomer] = useState([]);

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
      <AdminPage>
        <div>
          <div className="toptable">
            <h1 style={{ marginLeft: "30px" }}>Danh sách khách hàng</h1>
            <div className="topnav__right">
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
                  <TableCustomer
                    limit="5"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={dataCustomer}
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
