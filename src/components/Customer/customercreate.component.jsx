import React from "react";
function CustomerCreate({ data, closeModel }) {
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
              <input type="text"  readOnly />
              <label>Tên khách hàng:</label>
              <input type="text" defaultValue="" />
              <label>Số điện thoại:</label>
              <input type="text" defaultValue="" />
              <label>Địa chỉ:</label>
              <input type="text" defaultValue="" />
              <label>Email:</label>
              <input type="text" defaultValue="" />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                disabled
                type="checkbox"
                defaultChecked={true}
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

export default CustomerCreate;
