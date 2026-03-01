"use client"

import { products } from "@/lib/products"
import { ProductCard } from "./product-card"
import { ShoppingBag, Footprints, Sparkles } from "lucide-react"

const categories = [
  {
    title: "حقائب",
    icon: ShoppingBag,
    products: products.filter((p) => p.id >= 1 && p.id <= 10),
  },
  {
    title: "أحذية واكسسوارات",
    icon: Footprints,
    products: products.filter((p) => p.id >= 11 && p.id <= 20),
  },
  {
    title: "مستحضرات تجميل",
    icon: Sparkles,
    products: products.filter((p) => p.id >= 21 && p.id <= 30),
  },
]

export function ProductGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {categories.map((category) => (
        <div key={category.title} className="mb-14">
          {/* عنوان القسم */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <category.icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {category.title}
            </h2>
          </div>

          {/* شبكة المنتجات: 2 في الموبايل، 3 في الشاشة الكبيرة */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
