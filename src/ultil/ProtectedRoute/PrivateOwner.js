import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../settingSystem";

const PrivateOwner = ({ children }) => {
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  if (parseInt(role) === 2) {
    return <Navigate to="/dashboard/overview" />;
  } else if (parseInt(role) === 3) {
    return <Navigate to="/dashboard/order" />;
  } else {
    return children;
  }
};
export default PrivateOwner;
