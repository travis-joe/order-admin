export function safeArray(arr: any) {
  return arr instanceof Array ? arr : []
}

export function safeCurrency(num: number) {
  return (num / 100 || 0).toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}
