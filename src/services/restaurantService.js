import { BaseService } from "./BaseService";

class RestaurantService extends BaseService {
  getRestaurant = () => {
    return this.get(`restaurants`);
  };
  createRestaurant = (model) => {
    return this.post(`restaurants`, model);
  };
  updateRestaurant = (model) => {
    return this.put(`restaurants`, model);
  };
  deleteRestaurant = (id) => {
    return this.delete(`restaurants/${id}`);
  };
}

export const restaurantService = new RestaurantService();
