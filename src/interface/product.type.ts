export class ProductType {
  id: number
  name: string // 商品名称
  price: number // 单价
  stock: number // 库存
  status: ProductStatusEnum // 商品状态
  description: string // 描述
  tags: string[] // 标签
  icons: string[] // 小图
  detail: string // 小图
}

export enum ProductStatusEnum {
  on = 'on',
  off = 'off',
  trash = 'trash',
}
export const ProductStatusText = {
  on: '在售中', // 正常
  off: '已下架', // 下架
  trash: '已删除', // 回收站
}
