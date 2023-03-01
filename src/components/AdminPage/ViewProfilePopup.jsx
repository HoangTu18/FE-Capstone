import "../Food/food.style.scss";
import UploadImage from "../../ultil/UploadImage";
import { useState } from "react";
function ProfileViewPopup({ closeModel }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="popup ">
      <form
        className="form-up"
        noValidate
        autoComplete="off"
        style={{ height: "400px" }}
      >
        <div className="food__title unselectable">Thông tin cá nhân</div>
        <div className="left">
          <div className="img__item">
            <img
              className="image"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">Họ tên:</label>
            <input
              type="text"
              // value={formik.values.foodName}
              // onChange={formik.handleChange}
            />
            <label className="label__title">Số điện thoại:</label>
            <input
              type="text"
              // value={formik.values.price}
              // onChange={formik.handleChange}
            />
            <label className="label__title">Email:</label>
            <input
              type="text"
              // value={formik.values.price}
              // onChange={formik.handleChange}
            />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              // value={formik.values.status}
              // onChange={formik.handleChange}
              checked={true}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem">
            <label className="label__title">Chức vụ:</label>
            <input
              type="text"
              id="price"
              name="price"
              // value={formik.values.price}
              // onChange={formik.handleChange}
            />
            <label className="label__title">Hình ảnh</label>
            <UploadImage getImageURL={setImageUrl} />
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

export default ProfileViewPopup;
