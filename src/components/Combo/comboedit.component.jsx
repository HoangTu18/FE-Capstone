import React from "react";
import "./comboedit.style.scss";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Gà nướng" },
  { value: "strawberry", label: "Xôi chiên phồng" },
  { value: "vanilla", label: "Mực xào sa tế" },
];
function ComboEdit({ closeModel }) {
  return (
    <div className="combo-edit">
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
              <input type="text" disabled />
            </label>
            <label className="combo-edit_label">
              Tên combo: <span className="proirity">*</span>
              <input type="text" />
            </label>
            <label className="combo-edit_label">
              Giá (VNĐ): <span className="proirity">*</span>
              <input type="text" />
            </label>
            <label className="combo-edit_label">
              Trạng thái: <span className="proirity">*</span>
              <label className="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </label>
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
        <label className="combo-edit_label">
          Danh sách món ăn
          <table>
            <tr>
              <td>Gà nướng</td>
              <td>
                Số lượng: <input type="text" className="input-number" />
              </td>
              <td>
                <input type="checkbox" className="input-checkbox" />
              </td>
            </tr>
            <tr>
              <td>Gà nướng</td>
              <td>
                Số lượng: <input type="text" className="input-number" />
              </td>
              <td>
                <input type="checkbox" className="input-checkbox" />
              </td>
            </tr>
            <tr>
              <td>Gà nướng</td>
              <td>
                Số lượng: <input type="text" className="input-number" />
              </td>
              <td>
                <input type="checkbox" className="input-checkbox" />
              </td>
            </tr>
          </table>
        </label>
        <label className="combo-edit_label">
          Các món đã chọn:
          <Select
            defaultValue={[options[0], options[1]]}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </label>
        <div className="action">
          <button type="submit" className="btn-success">
            Lưu
          </button>
          <button className="btn-danger" onClick={() => closeModel(false)}>
            Huỷ
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComboEdit;
