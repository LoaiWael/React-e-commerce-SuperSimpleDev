export interface selectedProduct {
  productId: string,
  quantity: number,
  estimatedDeliveryTimeMs?: number,
  product: product
}

export interface cartItem extends selectedProduct {
  id: number
  deliveryOptionId: string
}

export interface order {
  id: string,
  orderTimeMs: number,
  totalCostCents: number,
  products: selectedProduct[]
}

export interface product {
  keywords: string[],
  id: string,
  image: string,
  name: string,
  rating: { stars: number, count: number },
  priceCents: number
}

export interface deliveryOption {
  id: string,
  deliveryDays: number,
  priceCents: number,
  estimatedDeliveryTimeMs?: number
}

export interface paymentSummary {
  totalItems: number,
  productCostCents: number,
  shippingCostCents: number,
  totalCostBeforeTaxCents: number,
  taxCents: number,
  totalCostCents: number
}