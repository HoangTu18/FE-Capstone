import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "../Combo/comboedit.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/FoodManager/foodManageSlice";
import { updateEventRequest } from "../../pages/EventManager/eventManagerSlice";

let options = [];

function EventEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const cateData = useSelector((state) => state.foodManage.listCategory);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (
      selectedOption.length <= 0 &&
      selected.length <= 0 &&
      data.foodList.length > 0
    ) {
      data.foodList.forEach((item) => {
        console.log("Food Item", item);
        selected.push({
          id: item.id,
        });
        selectedOption.push({
          value: item.id,
          label: item.foodName,
        });
        options.push({
          value: item.id,
          label: item.foodName,
        });
        // setSelectedOption(...options);
        // console.log("option", options);
        // console.log("selectOption", selectedOption);
        // console.log("selectOption", selectedOption);
      });
    }
  }, [data.foodList, selected, selectedOption]);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleChangeCate = (e) => {
    options.length = 0;
    cateData.forEach((item) => {
      if (item.id === e.target.value) {
        item.foodList.forEach((food) => {
          options.push({
            value: food.id,
            label: food.foodName,
          });
        });
      }
    });
  };

  const handleUpdateEvent = useCallback(
    (values) => {
      let event = {
        eventId: values.eventId,
        eventName: values.eventName,
        description: values.description,
        image_url: values.image_url,
        fromDate: values.fromDate,
        toDate: values.toDate,
        status: values.status,
        foodList: selected,
      };
      console.log("EVENT", event.foodList);
      dispatch(updateEventRequest(event));
      options = [];
      closeModel(false);
    },
    [closeModel, dispatch, selected]
  );

  const formik = useFormik({
    initialValues: {
      eventId: data.eventId,
      eventName: data.eventName,
      description: data.description,
      image_url: data.image_url,
      fromDate: data.fromDate,
      toDate: data.toDate,
      status: data.status,
      foodList: data.foodList,
    },
    onSubmit: (values, { resetForm }) => {
      selected.length = 0;
      selectedOption.forEach((item) => {
        selected.push({ id: item.value });
      });
      handleUpdateEvent(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <div className="form-container">
          <form
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className="form-container"
          >
            <div className=" combo-edit">
              <div className="combo-left">
                <div className="combo-edit_image">
                  <img src={data.image_url} alt="Logo" />
                </div>
                <div className="combo-edit_infor">
                  {/* <form className="frm-combo-edit"> */}
                  <label className="combo-edit_label">
                    Mã sự kiện:
                    <input
                      type="text"
                      id="eventId"
                      value={formik.values.eventId}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
                    Tên sự kiện: <span className="proirity">*</span>
                    <input
                      type="text"
                      id="eventName"
                      value={formik.values.eventName}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">Thời gian:</label>
                  <label className="combo-edit_label smallText">
                    Từ ngày:
                    <input
                      type="date"
                      id="fromDate"
                      value={formik.values.fromDate}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label smallText">
                    Đến ngày:
                    <input
                      type="date"
                      id="toDate"
                      value={formik.values.toDate}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
                    Mô tả: <span className="proirity">*</span>
                    <textarea
                      type="text"
                      id="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
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
                  </label>
                  <div style={{ display: "flex", float: "right" }}>
                    <button type="submit" className="btn">
                      Lưu
                    </button>
                    <button
                      type="button"
                      className="btn cancel"
                      onClick={() => {
                        closeModel(false);
                        options = [];
                      }}
                    >
                      Huỷ
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
              <div className="combo-right">
                <h3>Chọn món ăn</h3>
                <label className="combo-edit_label">
                  Loại: <span className="proirity">*</span>
                  <select id="cateId" name="cateId" onChange={handleChangeCate}>
                    {cateData.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="combo-edit_label">
                  Các món đã chọn:
                  <Select
                    isMulti
                    id="foodList"
                    name="foodList"
                    value={selectedOption.map(
                      (item, index) => selectedOption[index]
                    )}
                    options={options}
                    onChange={handleSelectChange}
                    placeholder={"Chọn món..."}
                    noOptionsMessage={() => "Không có món trong mục này"}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventEdit;
