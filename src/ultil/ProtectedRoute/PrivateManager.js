import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../settingSystem";

const PrivateManager = ({ children }) => {
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  if (role === 1) {
    return <Navigate to="/dashboard/food" />;
  } else if (role === 2) {
    return <Navigate to="/dashboard/overview" />;
  } else {
    return children;
  }
};
export default PrivateManager;
