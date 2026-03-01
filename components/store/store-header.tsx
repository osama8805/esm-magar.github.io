"use client"

import Link from "next/link"
import { ShoppingCart, Sparkles } from "lucide-react"
import { useCart } from "./cart-provider"

export function StoreHeader() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* شعار المتجر */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">
            متجر أنيق
          </span>
        </Link>

        {/* أيقونة السلة مع عدد المنتجات */}
        <Link
          href="/checkout"
          className="relative flex items-center gap-2 rounded-full bg-secondary px-4 py-2 transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-medium">السلة</span>
          {count > 0 && (
            <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
