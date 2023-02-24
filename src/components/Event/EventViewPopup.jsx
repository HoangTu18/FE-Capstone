import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "../Combo/comboedit.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/FoodManager/foodManageSlice";
import { updateEventRequest } from "../../pages/EventManager/eventManagerSlice";

let options = [];

function EventView({ data, closeModel }) {
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
      });
    }
  }, [data.foodList, selected, selectedOption]);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
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
          <form className="form-container">
            <div className=" combo-edit">
              <div className="combo-left">
                <div className="combo-edit_image">
                  <img src={data.image_url} alt="Logo" />
                </div>
                <div className="combo-edit_infor">
                  {/* <form className="frm-combo-edit"> */}
                  <label className="combo-edit_label">
                    Mã sự kiện:
                    <input type="text" disabled value={formik.values.eventId} />
                  </label>
                  <label className="combo-edit_label">
                    Tên sự kiện: <span className="proirity">*</span>
                    <input
                      type="text"
                      disabled
                      value={formik.values.eventName}
                    />
                  </label>
                  <label className="combo-edit_label">Thời gian:</label>
                  <label className="combo-edit_label smallText">
                    Từ ngày:
                    <input
                      type="date"
                      value={formik.values.fromDate}
                      disabled
                    />
                  </label>
                  <label className="combo-edit_label smallText">
                    Đến ngày:
                    <input type="date" disabled value={formik.values.toDate} />
                  </label>
                  <label className="combo-edit_label">
                    Mô tả: <span className="proirity">*</span>
                    <textarea
                      type="text"
                      disabled
                      value={formik.values.description}
                    />
                  </label>
                  <label className="combo-edit_label">
                    <label>Trạng thái:</label>
                    <br></br>
                    <input
                      className="checkBoxStatus type"
                      type="checkbox"
                      disabled
                      checked={formik.values.status}
                    />
                  </label>
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
                  {/* </form> */}
                </div>
              </div>
              <div className="combo-right">
                <h3>Chọn món ăn</h3>
                <label className="combo-edit_label">
                  Loại: <span className="proirity">*</span>
                  <select disabled>
                    <option>Món khác</option>
                  </select>
                </label>
                <label className="combo-edit_label">
                  Các món đã chọn:
                  <Select
                    isMulti
                    isDisabled={true}
                    value={selectedOption.map(
                      (item, index) => selectedOption[index]
                    )}
                    options={options}
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

export default EventView;
