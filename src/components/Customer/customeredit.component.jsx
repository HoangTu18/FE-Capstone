import React from "react";
function CustomerEdit({ data, closeModel }) {
  return (
    <div className="modelBackground">
      <div className="form-popup" style={{ top: "15%" }}>
        <form action="" className="form-container">
          <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
            <div className="right">
              <label>Mã khách hàng:</label>
              <input type="text" value={data.customerId} readOnly />
              <label>Tên khách hàng:</label>
              <input type="text" defaultValue={data.customerName} />
              <label>Số điện thoại:</label>
              <input type="text" defaultValue={data.theAccount.phoneNumber} />
              <label>Địa chỉ:</label>
              <input type="text" defaultValue={data.address} />
              <label>Email:</label>
              <input type="text" value={data.email} />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                defaultChecked={data.theAccount.status}
              />
              {/* theAccount.status */}
              <div style={{ display: "flex", float: "right" }}>
                <button type="submit" className="btn">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => closeModel(false)}
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerEdit;
