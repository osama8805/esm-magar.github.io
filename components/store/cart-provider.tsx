"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"
import type { CartItem } from "@/lib/cart"
import {
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateQuantity as updateQuantityUtil,
  getCartCount,
  getCartTotal,
  clearCart as clearCartUtil,
} from "@/lib/cart"

interface CartContextType {
  cart: CartItem[]
  count: number
  total: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  // تحميل السلة عند أول تحميل
  useEffect(() => {
    setCart(getCart())
    setCount(getCartCount())
    setTotal(getCartTotal())
  }, [])

  const refreshState = useCallback(() => {
    setCart(getCart())
    setCount(getCartCount())
    setTotal(getCartTotal())
  }, [])

  const addToCart = useCallback(
    (product: Product) => {
      addToCartUtil(product)
      refreshState()
    },
    [refreshState]
  )

  const removeFromCart = useCallback(
    (productId: number) => {
      removeFromCartUtil(productId)
      refreshState()
    },
    [refreshState]
  )

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      updateQuantityUtil(productId, quantity)
      refreshState()
    },
    [refreshState]
  )

  const clearCart = useCallback(() => {
    clearCartUtil()
    refreshState()
  }, [refreshState])

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
