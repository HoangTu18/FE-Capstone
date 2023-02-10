import { Route, Routes } from "react-router-dom";
import AccountManager from "./pages/AccountManager/accountmanager.page";
import CustomerManager from "./pages/CustomerManager/customermanager.page";
import Dashboard from "./pages/Dashboard/dashboard.component";
import FoodManager from "./pages/FoodManager/foodmanager.page";
import Login from "./pages/Login/login.page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<AccountManager />} />
          <Route path="employee" element={<AccountManager />} />
          <Route path="customer" element={<CustomerManager />} />
          <Route path="food" element={<FoodManager />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
