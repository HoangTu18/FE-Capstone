import "./useredit.style.scss";
function UserCreate({ data, closeModel }) {
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form action="" className="form-container">
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
              Mã nhân viên: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />
            <label>
              Tên đăng nhập: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />

            <label>
              Mật khẩu: <span className="proirity">*</span>
            </label>
            <input type="password" defaultValue={""} />

            <label>
              Họ và tên: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />

            <label>
              Chức danh: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />

            <label>
              Email: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />

            <label>
              Số điện thoại: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />
            <label>
              Địa chỉ: <span className="proirity">*</span>
            </label>
            <input type="text" defaultValue={""} />

            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              defaultChecked={true}
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

export default UserCreate;
