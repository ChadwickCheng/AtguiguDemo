import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}

// export const reqHasTrademark = (page: number, limit: number) => {
//   return request.get<TradeMarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`);
// }

export const reqHasTrademark = (page: number, limit: number): Promise<TradeMarkResponseData> => {
  return request.get(`${API.TRADEMARK_URL}/${page}/${limit}`)
}

// 添加和修改品牌
export const reqAddOrUpdateTrademark = (data: TradeMark): Promise<void> => {
  // 修改
  if (data.id) {
    return request.put(API.UPDATETRADEMARK_URL, data)
  } else {
    // 添加
    return request.post(API.ADDTRADEMARK_URL, data)
  }
}
