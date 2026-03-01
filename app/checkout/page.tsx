import type { Metadata } from "next"
import { CartProvider } from "@/components/store/cart-provider"
import { StoreHeader } from "@/components/store/store-header"
import { CheckoutContent } from "@/components/store/checkout-content"
import { StoreFooter } from "@/components/store/store-footer"

export const metadata: Metadata = {
  title: "إتمام الطلب - متجر أنيق",
  description: "أكمل طلبك وادخل بيانات التوصيل والدفع",
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <StoreHeader />
        <main className="flex-1">
          <CheckoutContent />
        </main>
        <StoreFooter />
      </div>
    </CartProvider>
  )
}
