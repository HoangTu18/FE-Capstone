import "./OrderDetail.style.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrderDetail from "../MyTable/TableOrderDetail";
import { RESTAURANT_INFO } from "../../ultil/settingSystem";
import { updateOrderRequest } from "../../pages/OrderManage/OrderManageSlice";
function OrderDetail({ closeModel }) {
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.orderManage.orderItem);
  const [mergeData, setMergeData] = useState([]);
  const restaurantDetail = useSelector(
    (state) => state.restaurantManage.restaurantItem
  );
  const handleListStaff = () => {
    if (restaurantDetail !== undefined) {
      return JSON.parse(localStorage.getItem(RESTAURANT_INFO)).staffList.filter(
        (item) => item?.theAccountForStaff?.roleId === 4
      );
    } else {
      return restaurantDetail.staffList?.filter(
        (item) => item.theAccountForStaff.roleId === 4
      );
    }
  };

  useEffect(() => {
    setMergeData([]);
    // console.log(orderItem);
    if (Object.keys(orderItem).length !== 0 || orderItem !== null) {
      if (orderItem?.itemList?.length > 0) {
        orderItem.itemList.forEach((item) => {
          setMergeData((prev) => [
            ...prev,
            {
              id: `#${item.id}`,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              total: item.subTotal,
              isHeader: false,
            },
          ]);
        });
      }
      // if (orderItem?.comboList.length > 0) {
      //   orderItem.comboList.forEach((combo) => {
      //     setMergeData((prev) => [...prev, combo]);
      //   });
      // }
      if (orderItem?.party !== null) {
        if (orderItem?.party.itemList?.length > 0) {
          const quantityTable = orderItem.party.quantity;
          setMergeData((prev) => [
            ...prev,
            {
              id: `Mã tiệc: ${orderItem?.party.id}`,
              name: orderItem?.party.partyName,
              price: orderItem?.party.subTotal,
              quantity: orderItem?.party.quantity,
              total: orderItem?.party.totalPrice,
              isHeader: true,
            },
          ]);
          orderItem.party.itemList.forEach((partyItem) => {
            setMergeData((prev) => [
              ...prev,
              {
                id: partyItem.id,
                name: partyItem.foodName,
                price: partyItem.price,
                quantity: quantityTable,
                total: partyItem.price * quantityTable,
                isHeader: false,
              },
            ]);
          });
        }
      }

      if (orderItem?.serviceList?.length > 0) {
        orderItem.serviceList.forEach((service) => {
          setMergeData((prev) => [
            ...prev,
            {
              id: service.id,
              name: service.serviceName,
              price: service.servicePrice,
              quantity: 1,
              total: service.servicePrice,
              isHeader: false,
            },
          ]);
        });
      }
    }
  }, [orderItem]);

  const handleStaffDetail = (id) => {
    return (
      restaurantDetail &&
      restaurantDetail.staffList?.find((item) => item.staffId === +id)
    );
  };
  const restaurantId = JSON.parse(
    localStorage.getItem(RESTAURANT_INFO)
  )?.restaurantId;
  const [staffId, setStaffId] = useState(
    handleListStaff() ? handleListStaff()[0]?.staffId : null
  );
  const staffTableHead = [
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Đơn giá",
    "Số lượng",
    "Thành tiền",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => <tr key={index}></tr>;
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
  const handleApproveOrder = () => {
    if (orderItem.paymentMethod?.toString() === "ZaloPay") {
      dispatch(
        updateOrderRequest({
          infoUpdate: {
            staffId: parseInt(staffId),
            status: "waiting",
            orderId: parseInt(orderItem.id),
          },
          restaurantId: restaurantId,
        })
      );
    } else {
      dispatch(
        updateOrderRequest({
          infoUpdate: {
            staffId: parseInt(staffId),
            status: "accept",
            orderId: parseInt(orderItem.id),
          },
          restaurantId: restaurantId,
        })
      );
    }
    closeModel(false);
  };
  const handleDenyOrder = () => {
    dispatch(
      updateOrderRequest({
        infoUpdate: {
          staffId: 1,
          status: "deny",
          orderId: parseInt(orderItem.id),
        },
        restaurantId: restaurantId,
      })
    );
  };
  return (
    <div className="popup">
      <div className="model_order_detail">
        <div className="top_model_right">
          <div></div>
          <div style={{ display: "flex" }}>
            <div
              className="top_model_right_item"
              style={{
                backgroundColor: "#04AA6D",
                display: `${orderItem.status !== "pending" ? "none" : ""}`,
              }}
              onClick={() => handleApproveOrder()}
            >
              Xác nhận
            </div>
            <div
              className="top_model_right_item"
              style={{
                backgroundColor: "#ff0000",
                display: `${orderItem.status !== "pending" ? "none" : ""}`,
              }}
              onClick={() => handleDenyOrder()}
            >
              Từ chối
            </div>
          </div>
        </div>
        <div className="body_model_detail">
          <div className="row">
            <div className="col-4">
              <div className="body_model_detail_item">
                Ngày bán:<span>{formatDate(orderItem.orderDate)}</span>
              </div>
              <div className="body_model_detail_item">
                Mã hóa đơn:<span>#{orderItem.id}</span>
              </div>
              <div className="body_model_detail_item">
                Phương thức thanh toán:{" "}
                <span>
                  {orderItem.paymentMethod === "cash" ? "Tiền mặt" : "ZaloPay"}
                </span>
              </div>
              <div className="body_model_detail_item">
                Nhân viên phụ trách:
                {orderItem.status === "pending" ? (
                  <div className="selected_staff">
                    <select onChange={(e) => setStaffId(e.target.value)}>
                      {handleListStaff()?.map((item, index) => {
                        return (
                          <option key={index} value={item.staffId}>
                            {item.staffFullName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <span>
                    {handleStaffDetail(orderItem.staffId)?.staffFullName}
                  </span>
                )}
              </div>
            </div>
            <div className="col-8">
              <div className="body_model_detail_item">
                Cửa hàng: {restaurantDetail.restaurantName}
              </div>
              <div className="body_model_detail_item">
                SĐT cửa hàng: {restaurantDetail.restaurantNumber}
              </div>
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
            bodyData={mergeData}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
        <div
          style={{ display: "flex", float: "right" }}
          className="footer_model"
        >
          <div
            type="button"
            className="btn cancel"
            onClick={() => closeModel(false)}
          >
            Đóng
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
