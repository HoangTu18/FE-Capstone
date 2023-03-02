import { BaseService } from "./BaseService";
class OrderService extends BaseService {
  getOrder = () => {
    return this.get("orders");
  };
  getOrderByRestaurantId = (id) => {
    return this.get(`orders/restaurant/${id}`);
  };
  getOrderById = (id) => {
    return this.get(`orders/${id}`);
  };
}

export const orderService = new OrderService();
