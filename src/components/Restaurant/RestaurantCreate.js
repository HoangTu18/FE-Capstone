import "../User/useredit.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
function RestaurantCreate({ data, closeModel }) {
  const dispatch = useDispatch();
  const handleCreateRestaurant = useCallback(
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
      dispatch(createRestaurantRequest(restaurant))
      closeModel(false)
    },
    [dispatch,closeModel]
  );
  const formik = useFormik({
    initialValues: {
      restaurantId: "r_testt",
      restaurantLocation:
        "485, CMT8, Phường 13, Quận 10, Thành phố Hồ Chí Minh",
      latitude: "10.780554288035592",
      longitude: "106.67601868608942",
      restaurantName: "TFS TESTING",
      restaurantNumber: "",
      status: true,
    },
    onSubmit: (values, { resetForm }) => {
      handleCreateRestaurant(values);
      resetForm({ values: "" });
    },
  });
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
              onChange={formik.handleChange}
              values={formik.values.restaurantId}
            />
            <label>
              Tên nhà hàng: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              onChange={formik.handleChange}
              values={formik.values.restaurantName}
            />

            <label>Số điện thoại:</label>
            <input
              type="text"
              id="restaurantNumber"
              name="restaurantNumber"
              onChange={formik.handleChange}
              values={formik.values.restaurantNumber}
            />
            <label>Kinh độ:</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              onChange={formik.handleChange}
              values={formik.values.longitude}
            />
            <label>Vĩ độ:</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              onChange={formik.handleChange}
              values={formik.values.latitude}
            />
            <label>
              Địa chỉ: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="restaurantLocation"
              name="restaurantLocation"
              onChange={formik.handleChange}
              values={formik.values.restaurantLocation}
            />

            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              id="status"
              name="status"
              onChange={formik.handleChange}
              defaultChecked={true}
              values={formik.values.status}
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

export default RestaurantCreate;
