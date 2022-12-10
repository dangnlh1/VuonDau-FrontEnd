export function truncateText(text?: string, maxLength?: number) {
  if (!text || !maxLength) return
  if (text && text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}...`
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}
