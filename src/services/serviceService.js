import { BaseService } from "./BaseService";

class ServiceService extends BaseService {
  getService = () => {
    return this.get(`Services`);
  };
  createService = (model) => {
    return this.post(`Services`, model);
  };
  updateService = (model) => {
    return this.put(`Services`, model);
  };
  deleteService = (id) => {
    return this.delete(`Services/${id}`);
  };
}

export const serviceService = new ServiceService();
