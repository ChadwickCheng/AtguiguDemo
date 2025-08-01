import request from "@/utils/request";
import type { TradeMarkResponseData } from "./type";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark"
}

// export const reqHasTrademark = (page: number, limit: number) => {
//   return request.get<TradeMarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`);
// }

export const reqHasTrademark = (page: number, limit: number): Promise<TradeMarkResponseData> => {
  return request.get(`${API.TRADEMARK_URL}/${page}/${limit}`);
}
