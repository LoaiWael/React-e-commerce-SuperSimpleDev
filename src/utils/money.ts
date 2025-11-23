export function formatCurrency(money: number) {
  return `$${(money / 100).toFixed(2)}`;
}