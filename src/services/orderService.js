import { BaseService } from "./BaseService";
class OrderService extends BaseService {
  getOrder = () => {
    return this.get("orders");
  };
  getOrderById = (id) => {
    return this.get(`orders/${id}`);
  };
}

export const orderService = new OrderService();
