import "./useredit.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateStaffRequest } from "../../pages/AccountManager/accountManageSlice";
function UserEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  console.log("Thanh En", data);
  const handleUpdateStaff = useCallback(
    (values) => {
      let staff = {
        staffActivityStatus: "available",
        staffAvatarUrl: "url-test v1",
        staffEmail: values.staffEmail,
        staffFullName: values.staffFullName,
        staffId: values.staffId,
        staffStatus: true,
        theAccountForStaff: {
          accountId: values.accountId,
          password: values.password,
          phoneNumber: values.phoneNumber,
          roleId: 4,
          status: true,
        },
      };
      console.log("STAFF", staff);
      closeModel(false);
      dispatch(updateStaffRequest(staff));
    },
    [dispatch, closeModel]
  );
  const formik = useFormik({
    initialValues: {
      staffId: data.staffId,
      accountId: data.theAccountForStaff.accountId,
      password: data.theAccountForStaff.password,
      staffFullName: data.staffFullName,
      roleId: "STAFF",
      staffEmail: data.staffEmail,
      phoneNumber: data.theAccountForStaff.phoneNumber,
      address: data?.address,
      status: data.theAccountForStaff.status,
      staffActivityStatus: data.staffActivityStatus,
      staffAvatarUrl: data.staffAvatarUrl,
      staffStatus: data.staffStatus,
    },
    onSubmit: (values, { resetForm }) => {
      handleUpdateStaff(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="form-container"
        >
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
            <input
              type="text"
              disabled
              id="staffId"
              name="staffId"
              value={formik.values.staffId}
              onChange={formik.handleChange}
            />
            <label>
              Tên đăng nhập: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="accountId"
              name="accountId"
              value={formik.values.accountId}
              onChange={formik.handleChange}
            />

            <label>
              Mật khẩu: <span className="proirity">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <label>
              Họ và tên: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="staffFullName"
              name="staffFullName"
              value={formik.values.staffFullName}
              onChange={formik.handleChange}
            />

            <label>
              Chức danh: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="roleId"
              name="roleId"
              value={formik.values.roleId}
              onChange={formik.handleChange}
            />

            <label>
              Email: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="staffEmail"
              name="staffEmail"
              value={formik.values.staffEmail}
              onChange={formik.handleChange}
            />

            <label>
              Số điện thoại: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <label>
              Địa chỉ: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />

            <label>Trạng thái: </label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="staffStatus"
              name="staffStatus"
              value={formik.values.staffStatus}
              checked={formik.values.staffStatus}
              onChange={formik.handleChange}
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

export default UserEdit;
