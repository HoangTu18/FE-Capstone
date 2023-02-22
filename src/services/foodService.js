import { BaseService } from "./BaseService";

class FoodService extends BaseService {
  getFood = () => {
    return this.get(`foods`);
  };
  insertFood = (model) => {
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
  addFoodtoCategory = (foodId, cateId) => {
    return this.post(`categories/${foodId}TO${cateId}`);
  };
}
export const foodService = new FoodService();
