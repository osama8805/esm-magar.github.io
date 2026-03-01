"use client"

import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/products"
import { useCart } from "./cart-provider"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.desc}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {product.price} جنيه
          </span>

          <button
            onClick={handleAdd}
            disabled={added}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              added
                ? "bg-green-100 text-green-700"
                : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم الإضافة</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
