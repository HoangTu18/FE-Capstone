import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateFoodRequest } from "../../pages/FoodManager/foodManageSlice";
import UploadImage from "../../ultil/UploadImage";
function FoodEdit({
  data,
  closeModel,
  listCate,
  cateId,
  listRegion,
  regionId,
}) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const handleUpdateFood = useCallback(
    (values) => {
      let food = {
        id: values.id,
        foodName: values.foodName,
        description: values.description,
        price: values.price,
        imgUrl: values.imageUrl,
        status: values.status,
        cateId: values.cateId,
        purchaseNum: 0,
        regionId: values.regionId,
      };
      closeModel(false);
      dispatch(updateFoodRequest(food));
    },
    [dispatch, closeModel]
  );
  const formik = useFormik({
    initialValues: {
      id: data.id,
      foodName: data.foodName,
      description: data.description,
      price: data.price,
      imgUrl: data.imgUrl,
      status: data.status,
      purchaseNum: data.purchaseNum,
      cateId: cateId,
      regionId: regionId,
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
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
          <div className="left">
            <img
              className="avatar"
              src={
                imageUrl
                  ? imageUrl
                  : data.imgUrl
                  ? data.imgUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
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
              Vùng/Miền: <span className="proirity">*</span>
            </label>
            <select
              id="regionId"
              name="regionId"
              value={formik.values.regionId}
              onChange={formik.handleChange}
            >
              {listRegion.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.region_name}
                  </option>
                );
              })}
            </select>
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
            {/* <UploadImage getImageURL={setImageUrl} /> */}
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

export default FoodEdit;
