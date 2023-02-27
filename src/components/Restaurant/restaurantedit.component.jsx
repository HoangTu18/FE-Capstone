import "../User/useredit.style.scss";
import { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
function RestaurantEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const handleEditRestaurant = useCallback(
    (values) => {
      let restaurant = {
        restaurantId: values.restaurantId,
        restaurantLocation: values.restaurantLocation,
        latitude: values.latitude,
        longitude: values.longitude,
        restaurantName: values.restaurantName,
        restaurantNumber: values.restaurantNumber,
        status: values.status,
      };
      dispatch(updateRestaurantRequest(restaurant))
      closeModel(false)
    },
    [dispatch,closeModel]
  );
  const formik = useFormik({
    initialValues: {
      restaurantId: data.restaurantId,
      restaurantLocation: data.restaurantLocation,
      latitude: data.latitude,
      longitude: data.longitude,
      restaurantName: data.restaurantName,
      restaurantNumber: data.restaurantNumber,
      status: data.status,
      staffList: data.staffList,
    },
    onSubmit: (values, { resetForm }) => {
      handleEditRestaurant(values);
      resetForm({ values: "" });
    },
  });
  console.log("DATE", data.staffList);
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form
          action=""
          className="form-container"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
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
            <input
              type="text"
              id="restaurantId"
              name="restaurantId"
              value={formik.values.restaurantId}
              onChange={formik.handleChange}
            />
            <label>
              Tên nhà hàng: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formik.values.restaurantName}
              onChange={formik.handleChange}
            />

            <label>Số điện thoại:</label>
            <input
              type="text"
              id="restaurantNumber"
              name="restaurantNumber"
              value={formik.values.restaurantNumber}
              onChange={formik.handleChange}
            />

            <label>
              Người quản lý: <span className="proirity">*</span>
            </label>
            <select
              type="text"
              value={formik.values.staffList}
              onChange={formik.handleChange}
            >
              {data.staffList &&
                data.staffList.map((item, index) => {
                  return (
                    <option value={item.staffId}>{item.staffFullName}</option>
                  );
                })}
            </select>

            <label>
              Địa chỉ: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="restaurantLocation"
              name="restaurantLocation"
              value={formik.values.restaurantLocation}
              onChange={formik.handleChange}
            />

            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              defaultChecked={formik.values.status}
              onChange={formik.handleChange}
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
