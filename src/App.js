import { Route, Routes } from "react-router-dom";
import AccountManager from "./pages/AccountManager/AccountManager.page";
import CustomerManager from "./pages/CustomerManager/CustomerManager.page";
import Dashboard from "./pages/Dashboard/dashboard.component";
import FoodManager from "./pages/FoodManager/foodmanager.page";
import Login from "./pages/Login/login.page";
import RestaurantManager from "./pages/RestaurantManager/RestaurantManager.page";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import OrderManage from "./pages/OrderManage/OrderManage";
function App() {
  return (
    <div>
      <Loading/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<AccountManager />} />
            <Route path="employee" element={<AccountManager />} />
            <Route path="customer" element={<CustomerManager />} />
            <Route path="food" element={<FoodManager />} />
            <Route path="restaurant" element={<RestaurantManager />} />
            <Route path="order" element={<OrderManage/>}/>
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
