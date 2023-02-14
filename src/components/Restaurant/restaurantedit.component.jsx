import "../User/useredit.style.scss";
function RestaurantEdit({ data, closeModel }) {
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form action="" className="form-container">
          <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="right">
            <label>Mã nhà hàng:</label>
            <input type="text" defaultValue={data.restaurantId} readOnly />
            <label>
              Tên nhà hàng: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={data.restaurantName} />

            <label>Số điện thoại:</label>
            <input type="text" defaultValue={data.restaurantNumber} />

            <label>
              Người quản lý: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={data.restaurantName} />

            <label>
              Địa chỉ: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={data.restaurantLocation} />

            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              defaultChecked={data.status}
            />
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
        </form>
      </div>
    </div>
  );
}

export default RestaurantEdit;
