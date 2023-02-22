import { BaseService } from "./BaseService";

class FoodService extends BaseService {
  getFood = () => {
    return this.get(`foods`);
  };
  createFood = (model) => {
    return this.post(`foods`, model);
  };
  updateFood = (model) => {
    return this.put(`foods`, model);
  };
  deleteFood = (id) => {
    return this.delete(`foods/${id}`);
  };
  getCategory = () => {
    return this.get(`categories`);
  };
}
export const foodService = new FoodService();
