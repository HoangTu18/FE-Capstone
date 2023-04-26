import { useState } from "react";
import "./orderSubView.scss";

function OrderSubView({ getReason, onClose }) {
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
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

  return (
    <div className="ordersub-container">
      <div className="header">
        <h3> Vui lòng điền lý do từ chối đơn</h3>
      </div>
      <div className="content">
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
        />
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
