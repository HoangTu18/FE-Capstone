import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.scss";
const Login = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/dashboard/employee");
  };

  return (
    <div className="login">
      <div className="login__form">
        <h3>Login</h3>
        <div className="input">
          <input type="text" placeholder="Username" />
          <i className="fa fa-user"></i>
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
          <i className="fa fa-key"></i>
        </div>
        <div className="button-login">
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
