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
    <div className="">
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
        
        </div>
      </div>
    </div>
  );
}

export default ComboEdit;
