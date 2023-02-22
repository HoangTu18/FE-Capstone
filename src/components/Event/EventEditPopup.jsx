import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequest } from "../../pages/FoodManager/foodManageSlice";
function EventEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.foodManage.listFood);
  const options = [];
  useEffect(() => {
    dispatch(getFoodRequest());
  }, [dispatch]);
  foodData.forEach((item) => {
    options.push({ value: item.id, label: item.foodName });
  });
  const handleUpdateFood = useCallback(
    (values) => {
      let event = {
        id: values.id,
        foodName: values.foodName,
        description: values.description,
        price: values.price,
        imgUrl: values.imgUrl,
        status: values.status,
        cateId: values.cateId,
        purchaseNum: 0,
      };
      console.log("EVENT", event);
      closeModel(false);
    },
    [closeModel]
  );
  const formik = useFormik({
    initialValues: {
      id: "",
      foodName: "",
      description: "",
      price: "",
      imgUrl: "",
      status: true,
      purchaseNum: "",
      cateId: "ca_00",
    },
    onSubmit: (values, { resetForm }) => {
      handleUpdateFood(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="form-container"
        >
          <label cl>Thông tin sự kiện</label>
          <hr></hr>
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
            <label>Mã sự kiện:</label>
            <input
              type="text"
              disabled
              id="id"
              name="id"
              value={""}
              onChange={formik.handleChange}
            />
            <label>Tên sự kiện:</label>
            <input
              type="text"
              disabled
              id="id"
              name="id"
              value={""}
              onChange={formik.handleChange}
            />
            <label>Thời gian:</label>
            <br></br>
            <label className="smallText">Từ ngày:</label>
            <input
              type="date"
              id="id"
              name="id"
              onChange={formik.handleChange}
            />
            <label className="smallText">Đến ngày:</label>
            <input
              type="date"
              id="id"
              name="id"
              onChange={formik.handleChange}
            />
            <Select
              isMulti
              name="foods"
              options={options}
              placeholder={"Chọn món..."}
            />
            <label>Trạng thái:</label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              checked={formik.values.status}
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

export default EventEdit;
