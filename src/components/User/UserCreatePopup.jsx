import "./useredit.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import {
  createAccountRequest,
  getRoleRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import { useEffect } from "react";
import { getRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
function UserCreate({ closeModel }) {
  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);
  const listRestaurant = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );

  useEffect(() => {
    dispatch(getRoleRequest());
    dispatch(getRestaurantRequest());
  }, [dispatch]);

  const handleAddStaff = useCallback(
    (values) => {
      let staff = {
        staffActivityStatus: "available",
        staffAvatarUrl: "url-test v1",
        staffEmail: values.staffEmail,
        staffFullName: values.staffFullName,
        staffStatus: true,
        theAccountForStaff: {
          accountId: values.accountId,
          password: values.password,
          phoneNumber: values.phoneNumber,
          roleId: parseInt(values.roleId),
          status: true,
        },
      };
      if (parseInt(values.roleId) === 4 || parseInt(values.roleId) === 3) {
        let resById = listRestaurant?.find(
          (item) => item.restaurantId === values.restaurantId
        );
        // dispatch(updateRestaurantRequest(restaurant));
        dispatch(
          createAccountRequest({
            staff: staff,
            roleId: values.roleId,
            restaurantId: resById.restaurantId,
          })
        );
      } else {
        dispatch(
          createAccountRequest({
            staff: staff,
            roleId: values.roleId,
          })
        );
      }
      closeModel(false);
    },
    [dispatch, closeModel, listRestaurant]
  );

  const validation = Yup.object().shape({
    accountId: Yup.string().required('Vui lòng nhập tên đăng nhập!'),
    password: Yup.string().min(6, 'Mật khẩu ít nhất có 6 ký tự!').max(14, 'Mật khẩu tối đa 14 ký tự!').matches('/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]$/', 'Mật khẩu phải có kí tự là chữ cái và số!').required('Vui lòng nhập mật khẩu!'),
    staffFullName: Yup.string().required('Vui lòng nhập họ và tên!'),
    staffEmail: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
    phoneNumber: Yup.string().min(0, 'Số điện thoại không hợp lệ!').max(10, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!')
  });

  const initialValues = {
    staffId: "",
    accountId: "",
    password: "",
    staffFullName: "",
    roleId: 3,
    staffEmail: "",
    phoneNumber: "",
    status: true,
    staffActivityStatus: "",
    staffAvatarUrl: "",
    staffStatus: true,
    restaurantId: 1,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleAddStaff(values);
      resetForm({ values: "" });
    },
  });

  const renderListRestaurant = (role) => {
    if (role === 3) {
      return (
        <select
          onChange={formik.handleChange}
          value={formik.values.restaurantId}
          id="restaurantId"
          name="restaurantId"
        >
          {listRestaurant &&
            listRestaurant.map((item, index) => {
              return (
                <option key={index} value={item.restaurantId}>
                  {item.restaurantName}
                </option>
              );
            })}
        </select>
      );
    } else if (role === 4) {
      return (
        <select
          onChange={formik.handleChange}
          value={formik.values.restaurantId}
          id="restaurantId"
          name="restaurantId"
        >
          {listRestaurant &&
            listRestaurant.map((item, index) => {
              return (
                <option key={index} value={item.restaurantId}>
                  {item.restaurantName}
                </option>
              );
            })}
        </select>
      );
    } else {
      return (
        <select disabled>
          <option>Bạn không thể chọn</option>
        </select>
      );
    }
  };

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
            <label hidden>
              Mã nhân viên: <span className="proirity">*</span>
            </label>
            <input
              hidden
              disabled
              type="text"
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
              onBlur={formik.handleBlur}
            />
            {formik.errors.accountId ? (
              <div className="error__message">
                <span>{formik.errors.accountId}</span>
              </div>
            ) : null}
            <label>
              Mật khẩu: <span className="proirity">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div className="error__message">
                <span>{formik.errors.password}</span>
              </div>
            ) : null}
            <label>
              Họ và tên: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="staffFullName"
              name="staffFullName"
              value={formik.values.staffFullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.staffFullName ? (
              <div className="error__message">
                <span>{formik.errors.staffFullName}</span>
              </div>
            ) : null}
            <label>
              Chức danh: <span className="proirity">*</span>
            </label>
            <select
              type="text"
              id="roleId"
              name="roleId"
              value={formik.values.roleId}
              onChange={formik.handleChange}
            >
              {listRole.map((item) => {
                if (item.roleId !== 5) {
                  return (
                    <option key={item.roleId} value={item.roleId}>
                      {item.roleName}
                    </option>
                  );
                }
              })}
            </select>
            <label>
              Email: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="staffEmail"
              name="staffEmail"
              value={formik.values.staffEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.staffEmail ? (
              <div className="error__message">
                <span>{formik.errors.staffEmail}</span>
              </div>
            ) : null}
            <label>
              Số điện thoại: <span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phoneNumber ? (
              <div className="error__message">
                <span>{formik.errors.phoneNumber}</span>
              </div>
            ) : null}
            <label>
              Cửa hàng: <span className="proirity">*</span>
            </label>
            {renderListRestaurant(parseInt(formik.values.roleId))}
            <label>Trạng thái: </label>
            <br></br>
            <input
              disabled
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
