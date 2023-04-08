import "../Food/food.style.scss";
function UserView({ data, closeModel }) {
  const roleNamebyId = (id) => {
    switch (id) {
      case 1:
        return "OWNER";
      case 2:
        return "ADMIN";
      case 3:
        return "MANAGER";
      case 4:
        return "STAFF";
    }
  };
  return (
    <div className="popup">
      <form className="form-up" style={{ height: "620px", width: "400px" }}>
        <div className="food__title unselectable">Thông tin nhân viên</div>
        <div className="center">
          <div className="listitem">
            {/* <label className="label__title">Mã nhân viên:</label>
            <input type="text" value={data.staffId} /> */}
            <label className="label__title">Tên đăng nhập:</label>
            <input type="text" value={data.theAccountForStaff.accountId} />

            <label className="label__title"> Họ và tên:</label>
            <input type="text" value={data.staffFullName} />

            <label className="label__title">Chức danh:</label>
            <input type="text" value={roleNamebyId(data.roleId)} />

            <label className="label__title">Email:</label>
            <input type="text" value={data.staffEmail} />

            <label className="label__title">Số điện thoại:</label>
            <input type="text" value={data.theAccountForStaff.phoneNumber} />

            <label className="label__title">Trạng thái:</label>
            <input
              disabled
              className="checkBoxStatus type"
              type="checkbox"
              checked={data.staffStatus}
            />

            <div className="food__button">
              <button
                type="button"
                className="btn cancel"
                onClick={() => closeModel(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserView;
