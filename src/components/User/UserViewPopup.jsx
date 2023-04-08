import "../Food/food.style.scss";
function UserView({ data, closeModel }) {
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
            <input type="text" value={data.staffId} />

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
    // <div className="popup">
    //   <div className="form-popup" style={{ height: "500px", width: "400px" }}>
    //     <div className="food__title unselectable">Thay đổi mật khẩu</div>
    //     <div className="center">
    //       <div className="listitem">
    //         <label className="label__title">Mật khẩu cũ:</label>
    //         <input
    //           type="text"
    //           disabled
    //           id="staffId"
    //           name="staffId"
    //           value={data.staffId}
    //         />
    //         <label>
    //           Tên đăng nhập: <span className="proirity">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           disabled
    //           id="accountId"
    //           name="accountId"
    //           value={data.theAccountForStaff.accountId}
    //         />
    //         <label>
    //           Mật khẩu: <span className="proirity">*</span>
    //         </label>
    //         <input
    //           disabled
    //           type="password"
    //           id="password"
    //           name="password"
    //           value={"an mat khau rui hehe"}
    //         />
    //         <label>
    //           Họ và tên: <span className="proirity">*</span>
    //         </label>
    //         <input
    //           disabled
    //           type="text"
    //           id="staffFullName"
    //           name="staffFullName"
    //           value={data.staffFullName}
    //         />

    //         <label>
    //           Chức danh: <span className="proirity">*</span>
    //         </label>
    //         <select id="roleId" name="roleId" value={data.roleId}>
    //           <option value={3}>MANAGER</option>
    //           <option value={4}>STAFF</option>
    //         </select>

    //         <label>
    //           Email: <span className="proirity">*</span>
    //         </label>
    //         <input
    //           disabled
    //           type="text"
    //           id="staffEmail"
    //           name="staffEmail"
    //           value={data.staffEmail}
    //         />

    //         <label>
    //           Số điện thoại: <span className="proirity">*</span>
    //         </label>
    //         <input
    //           disabled
    //           type="text"
    //           id="phoneNumber"
    //           name="phoneNumber"
    //           value={data.theAccountForStaff.phoneNumber}
    //         />

    //         <label>Trạng thái: </label>
    //         <br></br>
    //         <input
    //           disabled
    //           className="checkBoxStatus type"
    //           type="checkbox"
    //           id="staffStatus"
    //           name="staffStatus"
    //           checked={data.staffStatus}
    //         />
    //         <div className="food__button">
    //           <button
    //             type="button"
    //             className="btn cancel"
    //             onClick={() => closeModel(false)}
    //           >
    //             Đóng
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default UserView;
