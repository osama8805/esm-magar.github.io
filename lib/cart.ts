// أدوات إدارة سلة التسوق باستخدام localStorage
import type { Product } from "./products"

export interface CartItem {
  product: Product
  quantity: number
}

const CART_KEY = "store_cart"

// قراءة السلة من localStorage
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(CART_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// حفظ السلة في localStorage
export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// إضافة منتج للسلة
export function addToCart(product: Product): CartItem[] {
  const cart = getCart()
  const existingIndex = cart.findIndex(
    (item) => item.product.id === product.id
  )

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1
  } else {
    cart.push({ product, quantity: 1 })
  }

  saveCart(cart)
  return cart
}

// حذف منتج من السلة
export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart().filter((item) => item.product.id !== productId)
  saveCart(cart)
  return cart
}

// تحديث كمية المنتج
export function updateQuantity(
  productId: number,
  quantity: number
): CartItem[] {
  const cart = getCart()
  const index = cart.findIndex((item) => item.product.id === productId)
  if (index >= 0) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
  }
  saveCart(cart)
  return cart
}

// حساب عدد المنتجات في السلة
export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

// حساب المجموع الكلي
export function getCartTotal(): number {
  return getCart().reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
}

// تفريغ السلة بالكامل
export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_KEY)
}
