import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { insertFoodRequest } from "../../pages/FoodManager/foodManageSlice";
function FoodAdd({ closeModel, listCate }) {
  const dispatch = useDispatch();
  const handleInsertFood = useCallback(
    (values) => {
      let food = {
        id: values.id,
        foodName: values.foodName,
        description: values.description,
        price: values.price,
        imgUrl: values.imgUrl,
        status: values.status,
        cateId: values.cateId,
        purchaseNum: 0,
      };
      console.log("FOOD", food);
      closeModel(false);
      dispatch(insertFoodRequest(food));
    },
    [dispatch, closeModel]
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
      handleInsertFood(values);
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
            <label>
              Mã món ăn: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              disabled
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label>
              Tên món ăn: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formik.values.foodName}
              onChange={formik.handleChange}
            />
            <label>
              Giá (VND): <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label>
              Loại: <span className="proirity">*</span>
            </label>
            <select
              id="cateId"
              name="cateId"
              value={formik.values.cateId}
              onChange={formik.handleChange}
            >
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label>
              Hình ảnh:
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                value={formik.values.imgUrl}
                onChange={formik.handleChange}
              />
            </label>
            <label>
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
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

export default FoodAdd;
