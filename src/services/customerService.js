import { BaseService } from "./BaseService";

class CustomerService extends BaseService {
  getAllCustomer = () => {
    return this.get("customers");
  };
  deleteCustomer = (id) => {
    return this.delete(`customers/${id}`);
  };
}
export const customerService = new CustomerService();
