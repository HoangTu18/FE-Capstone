import { useState } from "react";
import "./orderSubView.scss";

function OrderSubView({ getReason, onClose }) {
  const [message, setMessage] = useState("");
  const handleOnSubmit = () => {
    if (message !== "") {
      getReason(message);
      setMessage("");
      onClose(false);
    }
  };
  const handleOnCancel = () => {
    onClose(false);
  };

  const onChangeValue = (event) => {
    setMessage(event.target.value);
  };

  const listReason = [
    "Phát hiện đơn hàng gian lận",
    "Nguyên liệu hôm nay không đạt tiêu chuẩn",
    "Đơn hàng quá lớn không thể đáp ứng",
  ];

  return (
    <div className="ordersub-container">
      <div className="header">
        <h3> Vui lòng chọn lý do từ chối đơn</h3>
      </div>
      <div className="content">
        <div onChange={onChangeValue}>
          {listReason.map((item, index) => {
            return (
              <div className="reason" key={item}>
                <input type="radio" name="reason" value={item} />
                <span>
                  {index + 1}. {item}.
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn" onClick={handleOnSubmit}>
          Xác nhận
        </button>
        <button
          type="button"
          className="btn cancel"
          style={{ marginLeft: "40px" }}
          onClick={handleOnCancel}
        >
          Huỷ
        </button>
      </div>
    </div>
  );
}

export default OrderSubView;
