// 定义TradeMark接口
interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

// 模拟数据库存储
const trademarkDatabase: TradeMark[] = [
  {
    id: 1,
    tmName: '苹果',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 2,
    tmName: '华为',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 3,
    tmName: '小米',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 4,
    tmName: '三星',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 5,
    tmName: 'OPPO',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 6,
    tmName: 'vivo',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 7,
    tmName: '一加',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 8,
    tmName: '魅族',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 9,
    tmName: '诺基亚',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 10,
    tmName: '联想',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 11,
    tmName: '索尼',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  },
  {
    id: 12,
    tmName: 'LG',
    logoUrl: 'http://localhost:5173/images/appicon.png'
  }
]

// 数据操作函数
class TrademarkService {
  // 获取所有数据
  static getAllTrademarks(): TradeMark[] {
    return [...trademarkDatabase]
  }

  // 分页获取数据
  static getTrademarksByPage(page: number, limit: number) {
    const total = trademarkDatabase.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const records = trademarkDatabase.slice(startIndex, endIndex)

    return {
      records,
      total,
      size: limit,
      current: page,
      searchCount: true,
      pages: Math.ceil(total / limit)
    }
  }

  // 根据ID查找
  static findById(id: number): TradeMark | undefined {
    return trademarkDatabase.find(item => item.id === id)
  }

  // 添加品牌
  static addTrademark(trademark: Omit<TradeMark, 'id'>): TradeMark {
    const newId = Math.max(...trademarkDatabase.map(item => item.id)) + 1
    const newTrademark: TradeMark = {
      id: newId,
      ...trademark
    }
    trademarkDatabase.push(newTrademark)
    return newTrademark
  }

  // 更新品牌
  static updateTrademark(id: number, updates: Partial<Omit<TradeMark, 'id'>>): TradeMark | null {
    const index = trademarkDatabase.findIndex(item => item.id === id)
    if (index === -1) return null

    trademarkDatabase[index] = {
      ...trademarkDatabase[index],
      ...updates
    }
    return trademarkDatabase[index]
  }

  // 删除品牌
  static deleteTrademark(id: number): boolean {
    const index = trademarkDatabase.findIndex(item => item.id === id)
    if (index === -1) return false

    trademarkDatabase.splice(index, 1)
    return true
  }

  // 检查品牌名称是否已存在
  static isNameExists(tmName: string, excludeId?: number): boolean {
    return trademarkDatabase.some(item =>
      item.tmName === tmName && (excludeId ? item.id !== excludeId : true)
    )
  }
}

export default [
  // 获取品牌列表
  {
    url: '/api/admin/product/baseTrademark/:page/:limit',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 3 } = query
      const pageNum = parseInt(page as string)
      const limitNum = parseInt(limit as string)

      try {
        const data = TrademarkService.getTrademarksByPage(pageNum, limitNum)

        return {
          code: 200,
          message: '获取成功',
          data,
          ok: true
        }
      } catch {
        return {
          code: 500,
          message: '服务器错误',
          data: null,
          ok: false
        }
      }
    }
  },
  // 添加品牌
  {
    url: '/admin/product/baseTrademark/save',
    method: 'post',
    response: ({ body }) => {
      const { tmName, logoUrl } = body

      // 验证必填字段
      if (!tmName || !logoUrl) {
        return {
          code: 400,
          message: '品牌名称和Logo不能为空',
          data: null,
          ok: false
        }
      }

      // 检查品牌名称是否已存在
      if (TrademarkService.isNameExists(tmName)) {
        return {
          code: 400,
          message: '品牌名称已存在',
          data: null,
          ok: false
        }
      }

      try {
        const newTrademark = TrademarkService.addTrademark({ tmName, logoUrl })
        return {
          code: 200,
          message: '添加品牌成功',
          data: newTrademark,
          ok: true
        }
      } catch {
        return {
          code: 500,
          message: '添加失败',
          data: null,
          ok: false
        }
      }
    }
  },
  // 修改品牌
  {
    url: '/admin/product/baseTrademark/update',
    method: 'put',
    response: ({ body }) => {
      const { id, tmName, logoUrl } = body

      // 验证必填字段
      if (!id || !tmName || !logoUrl) {
        return {
          code: 400,
          message: '参数不完整',
          data: null,
          ok: false
        }
      }

      // 检查品牌是否存在
      const existingTrademark = TrademarkService.findById(id)
      if (!existingTrademark) {
        return {
          code: 404,
          message: '品牌不存在',
          data: null,
          ok: false
        }
      }

      // 检查品牌名称是否已被其他品牌使用
      if (TrademarkService.isNameExists(tmName, id)) {
        return {
          code: 400,
          message: '品牌名称已存在',
          data: null,
          ok: false
        }
      }

      try {
        const updatedTrademark = TrademarkService.updateTrademark(id, { tmName, logoUrl })
        return {
          code: 200,
          message: '修改品牌成功',
          data: updatedTrademark,
          ok: true
        }
      } catch {
        return {
          code: 500,
          message: '修改失败',
          data: null,
          ok: false
        }
      }
    }
  },
  // 删除品牌
  {
    url: '/admin/product/baseTrademark/remove/:id',
    method: 'delete',
    response: ({ query }) => {
      const { id } = query
      const trademarkId = parseInt(id as string)

      if (!trademarkId) {
        return {
          code: 400,
          message: '无效的品牌ID',
          data: null,
          ok: false
        }
      }

      // 检查品牌是否存在
      const existingTrademark = TrademarkService.findById(trademarkId)
      if (!existingTrademark) {
        return {
          code: 404,
          message: '品牌不存在',
          data: null,
          ok: false
        }
      }

      try {
        const deleted = TrademarkService.deleteTrademark(trademarkId)
        if (deleted) {
          return {
            code: 200,
            message: '删除品牌成功',
            data: null,
            ok: true
          }
        } else {
          return {
            code: 500,
            message: '删除失败',
            data: null,
            ok: false
          }
        }
      } catch {
        return {
          code: 500,
          message: '删除失败',
          data: null,
          ok: false
        }
      }
    }
  },
  // 根据ID获取品牌详情
  {
    url: '/admin/product/baseTrademark/get/:id',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      const trademarkId = parseInt(id as string)

      if (!trademarkId) {
        return {
          code: 400,
          message: '无效的品牌ID',
          data: null,
          ok: false
        }
      }

      const trademark = TrademarkService.findById(trademarkId)
      if (!trademark) {
        return {
          code: 404,
          message: '品牌不存在',
          data: null,
          ok: false
        }
      }

      return {
        code: 200,
        message: '获取成功',
        data: trademark,
        ok: true
      }
    }
  }
]
