import React from "react";
import "./comboedit.style.scss";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Gà nướng" },
  { value: "strawberry", label: "Xôi chiên phồng" },
  { value: "vanilla", label: "Mực xào sa tế" },
];
function ComboEdit({ closeModel }) {
  const handleCheckbox = () => {};

  return (
    <div className="modelBackground">
      <div className="form-popup">
        <div className="form-container">
          <div className=" combo-edit">
            <div className="combo-left">
              <div className="combo-edit_image">
                <img
                  src={
                    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                  }
                  alt="Logo"
                />
              </div>
              <div className="combo-edit_infor">
                <form className="frm-combo-edit">
                  <label className="combo-edit_label">
                    Mã combo:
                    <input type="text" />
                  </label>
                  <label className="combo-edit_label">
                    Tên combo: <span className="proirity">*</span>
                    <input type="text" />
                  </label>
                  <label className="combo-edit_label">
                    Giá (VNĐ): <span className="proirity">*</span>
                    <input type="text" />
                  </label>
                  <label className="combo-edit_label">Thời gian:</label>
                  <label className="combo-edit_label smallText">
                    Từ ngày:
                    <input type="date" />
                  </label>
                  <label className="combo-edit_label smallText">
                    Đến ngày:
                    <input type="date" />
                  </label>
                  <label className="combo-edit_label">
                    <label>Trạng thái:</label>
                    <br></br>
                    <input
                      className="checkBoxStatus type"
                      type="checkbox"
                      id="status"
                      name="status"
                    />
                  </label>
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
                </form>
              </div>
            </div>
            <div className="combo-right">
              <h3>Chọn món ăn</h3>
              <label className="combo-edit_label">
                Loại: <span className="proirity">*</span>
                <select>
                  <option>Món chính</option>
                  <option>Món phụ</option>
                  <option>Tráng miệng</option>
                </select>
              </label>
              {/* <label className="combo-edit_label">
                Danh sách món ăn
                <ul>
                  <li>
                    <label style={{ paddingRight: "150px" }}>Gà nướng</label>
                    <input
                      name="foods"
                      type="checkbox"
                      className="input-checkbox"
                      onChange={() => handleCheckbox()}
                    />
                  </li>
                </ul>
              </label> */}
              <label className="combo-edit_label">
                Các món đã chọn:
                <Select
                  defaultValue={[options[0], options[1]]}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder={'Chọn món...'}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComboEdit;
