import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "../Food/food.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";
import { updateEventRequest } from "../../pages/EventManager/eventManagerSlice";
import UploadImage from "../../ultil/UploadImage";

let options = [];

function EventEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const cateData = useSelector((state) => state.foodManage.listCategory);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selected, setSelected] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (
      selectedOption.length <= 0 &&
      selected.length <= 0 &&
      data.foodList.length > 0
    ) {
      data.foodList.forEach((item) => {
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
    <div className="popup">
      <form
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="form-up"
      >
        <div className="food__title unselectable">Thông tin sự kiện</div>
        <div className="left">
          <div className="img__item">
            <img
              className="image"
              src={
                data.image_url
                  ? data.image_url
                  : imageUrl
                  ? imageUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">
              Mã sự kiện:<span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="eventId"
              value={formik.values.eventId}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Tên sự kiện:<span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="eventName"
              value={formik.values.eventName}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Thời gian:<span className="proirity">*</span>
            </label>
            <label className="label__title smallText">Từ ngày:</label>

            <input
              type="date"
              id="fromDate"
              value={formik.values.fromDate.slice(0, 10)}
              onChange={formik.handleChange}
            />
            <label className="label__title smallText"> Đến ngày:</label>

            <input
              type="date"
              id="toDate"
              value={formik.values.toDate.slice(0, 10)}
              onChange={formik.handleChange}
            />
            <label className="combo-edit_label">
              <UploadImage getImageURL={setImageUrl} />
            </label>
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              checked={formik.values.status}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem">
            <label className="label__title">Mô tả:</label>
            <textarea
              type="text"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
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

export default EventEdit;
