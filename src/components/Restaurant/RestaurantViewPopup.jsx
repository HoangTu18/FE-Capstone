import "../Food/food.style.scss";
function RestaurantView({ data, closeModel }) {
  console.log(data);
  return (
    <div>
      <div className="popup">
        <form
          action=""
          className="form-up"
          style={{ width: "450px", height: "650px" }}
        >
          <div className="food__title unselectable">Thông tin nhà hàng</div>
          <div className="center">
            <div className="listitem">
              <label>Mã nhà hàng:</label>
              <input type="text" defaultValue={data.restaurantId} readOnly />
              <label>Tên nhà hàng:</label>
              <input type="text" defaultValue={data.restaurantName} disabled />

              <label>Số điện thoại:</label>
              <input
                type="text"
                defaultValue={data.restaurantNumber}
                disabled
              />

              <label>Người quản lý:</label>
              <input type="text" defaultValue={data.restaurantName} disabled />

              <label>Địa chỉ:</label>
              <input
                type="text"
                defaultValue={data.restaurantLocation}
                disabled
              />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                disabled
                checked={data.status}
              />
              <div className="food__button">
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

export default RestaurantView;
