import "./OrderDetail.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrderDetail from "../MyTable/TableOrderDetail";
function OrderDetail({ data, closeModel }) {
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.orderManage.orderItem);
  const staffTableHead = [
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Đơn giá",
    "Số lượng",
    "Thành tiền",
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
  const formatDate = (date) => {
    let stringDate = date?.slice(0, 10);
    let preDate = stringDate?.split("-", 10);
    let time = date?.slice(12, 16);
    if (preDate) {
      let formattedDate =
        preDate[2] + "/" + preDate[1] + "/" + preDate[0] + " " + time;
      return formattedDate;
    }
  };
  return (
    <div className="model_order_detail">
      <div className="top_model_right">
        <div></div>
        <div style={{ display: "flex" }}>
          <div
            className="top_model_right_item"
            style={{ backgroundColor: "#04AA6D" }}
          >
            Xác nhận
          </div>
          <div
            className="top_model_right_item"
            style={{ backgroundColor: "#ff0000" }}
          >
            Từ chối
          </div>
        </div>
      </div>
      <div className="body_model_detail">
        <div className="row">
          <div className="col-5">
            <div className="body_model_detail_item">
              Ngày bán:<span>{formatDate(orderItem.orderDate)}</span>
            </div>
            <div className="body_model_detail_item">
              Hóa đơn:<span>#{orderItem.id}</span>
            </div>
            <div className="body_model_detail_item">
              Phương thức thanh toán: <span>{orderItem.paymentMethod}</span>
            </div>
            <div className="body_model_detail_item">Nhân viên phụ trách:</div>
          </div>
          <div className="col-7">
            <div className="body_model_detail_item">Cửa hàng:</div>
            <div className="body_model_detail_item">SĐT cửa hàng:</div>
            <div className="body_model_detail_item">
              Địa chỉ:<span>{orderItem.deliveryAddress}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="body_model_table">
        <TableOrderDetail
          headData={staffTableHead}
          renderHead={(item, index) => renderHead(item, index)}
          bodyData={orderItem.itemList}
          renderBody={(item, index) => renderBody(item, index)}
        />
      </div>
      <div style={{ display: "flex", float: "right" }} className="footer_model">
        <div
          type="button"
          className="btn cancel"
          onClick={() => closeModel(false)}
        >
          Đóng
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
