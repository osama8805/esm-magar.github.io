import { CartProvider } from "@/components/store/cart-provider"
import { StoreHeader } from "@/components/store/store-header"
import { HeroSection } from "@/components/store/hero-section"
import { ProductGrid } from "@/components/store/product-grid"
import { StoreFooter } from "@/components/store/store-footer"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <StoreHeader />
        <main className="flex-1">
          <HeroSection />
          <ProductGrid />
        </main>
        <StoreFooter />
      </div>
    </CartProvider>
  )
}
