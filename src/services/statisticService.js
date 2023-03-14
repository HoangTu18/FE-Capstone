import { BaseService } from "./BaseService";

export class StatisticService extends BaseService {
  getStatistic = () => {
    return this.get("statistic");
  };
  getRevenueBetween = (model) => {
    return this.post(`statistic/detail/owner`, model);
  };
  getStatisticByDate = (model) => {
    return this.post(`revenues/bydate`, model);
  };
}

export const statisticService = new StatisticService();
