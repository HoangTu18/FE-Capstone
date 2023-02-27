import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import Select from "react-select";
import UploadImage from "../../ultil/UploadImage";
import "./food.style.scss";
// let listFood = [];
function ComboFoodAdd({ closeModel, listCate }) {
  const [imageUrl, setImageUrl] = useState("");
  const [listFood, setListFood] = useState([]);
  const [test, setTest] = useState(false);
  console.log("render");

  const handleChangeCate = (e) => {
    listFood.length = 0;
    // setTest(!test);
    listCate.forEach((item) => {
      if (item.id === e.target.value) {
        item.foodList.forEach((food) => {
          setListFood((prev) => [
            ...prev,
            {
              id: food.id,
              lable: food.foodName,
              quantity: 0,
              isChecked: false,
            },
          ]);
        });
      }
    });
    console.log(listFood);
  };

  const handleChange = (e) => {
    // if (options.length !== 0) {
    //   if (e.target.checked) {
    //     selectedOptions.map((item) => {
    //       if (+e.target.id === item.id) {
    //       } else {
    //         options.push({ id: item.id, label: item.foodName, quantity: 1 });
    //       }
    //     });
    //   } else {
    //     let result = -1;
    //     for (let index = 0; index < options.length; index++) {
    //       if (options[index].id === +e.target.id) {
    //         result = index;
    //         break;
    //       }
    //     }
    //     options.splice(result, 1);
    //   }
    // } else {
    //   selectedOptions.map((item) => {
    //     if (+e.target.id === item.id && e.target.checked) {
    //       options.push({ id: item.id, label: item.foodName, quantity: 1 });
    //     }
    //   });
    // }
  };

  const handleQuantityChange = (e) => {
    // console.log("change", e);
    console.log("ID: ", e.target.id);
    console.log("Quantity: ", e.target.value);
  };

  const handleInsertFood = useCallback(
    (values) => {
      let combofood = {
        id: values.id,
        comboName: values.foodName,
        description: values.description,
        comboPrice: values.price,
        image: imageUrl,
        comboItems: [],
        status: values.status,
      };
      console.log("COMBO FOOD", combofood);
      closeModel(false);
      // dispatch(insertFoodRequest(combofood));
    },
    [closeModel, imageUrl]
  );
  const formik = useFormik({
    initialValues: {
      id: 0,
      comboName: "",
      description: "",
      comboPrice: "",
      image: "",
      comboItems: [],
      status: true,
    },
    onSubmit: (values, { resetForm }) => {
      handleInsertFood(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1000px" }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="food__title unselectable">Thông tin Combo</div>
        <div className="left">
          <div className="img__item">
            <img
              className="image"
              src={
                imageUrl
                  ? imageUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">
              Mã combo: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">Tên combo:</label>
            <input
              type="text"
              id="comboName"
              name="comboName"
              value={formik.values.comboName}
              onChange={formik.handleChange}
            />
            <label className="label__title">Giá (VND):</label>
            <input
              type="text"
              id="comboPrice"
              name="comboPrice"
              value={formik.values.comboPrice}
              onChange={formik.handleChange}
            />
            <label className="label__title">Hình ảnh</label>
            <UploadImage getImageURL={setImageUrl} />
            <label className="label__title">
              {" "}
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              checked={true}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem" style={{ width: "370px" }}>
            <label className="label__title">Loại:</label>
            <select id="cateId" name="cateId" onChange={handleChangeCate}>
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label className="label__title">Danh sách món ăn:</label>
            <div className="list__food">
              <ul>
                {listFood.map((item) => {
                  return (
                    <li key={item.id}>
                      <span>{item.lable}</span>
                      <span>
                        Số lượng:
                        <input
                          type="number"
                          min={1}
                          defaultValue={"1"}
                          id={item.id}
                          onChange={handleQuantityChange}
                        />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={item.isChecked}
                        onChange={handleChange}
                        id={item.id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <label className="label__title">Các món đã chọn:</label>
            <Select
              className="select__react"
              isMulti
              isDisabled
              // value={options.map((item, index) => options[index])}
              placeholder={"Chọn món..."}
              noOptionsMessage={() => "Không có món trong mục này"}
            />
            <div className="food__button">
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
  );
}

export default ComboFoodAdd;
