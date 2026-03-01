// بيانات المنتجات
export interface Product {
  id: number
  name: string
  price: number
  image: string
  desc: string
}

export const products: Product[] = [
  // ===== حقائب (10 منتجات) =====
  {
    id: 1,
    name: "حقيبة توت جلد",
    price: 1250,
    image: "/images/tote-bag.jpg",
    desc: "حقيبة يد واسعة من الجلد الطبيعي",
  },
  {
    id: 2,
    name: "كلتش سهرة ذهبية",
    price: 850,
    image: "/images/clutch.jpg",
    desc: "كلتش أنيقة للمناسبات الخاصة",
  },
  {
    id: 3,
    name: "حقيبة كروس بودي",
    price: 980,
    image: "/images/crossbody.jpg",
    desc: "حقيبة كتف عملية بتصميم عصري",
  },
  {
    id: 4,
    name: "حقيبة كتف بوردو",
    price: 1150,
    image: "/images/shoulder-bag.jpg",
    desc: "حقيبة كتف جلد بلون عنابي فاخر",
  },
  {
    id: 5,
    name: "شنطة ميني وردية",
    price: 680,
    image: "/images/mini-bag.jpg",
    desc: "حقيبة صغيرة ترند بلون زهري",
  },
  {
    id: 6,
    name: "حقيبة باكيت جلد",
    price: 1080,
    image: "/images/bucket-bag.jpg",
    desc: "حقيبة دلو بتصميم كلاسيكي أنيق",
  },
  {
    id: 7,
    name: "حقيبة سفر أنيقة",
    price: 1650,
    image: "/images/travel-bag.jpg",
    desc: "حقيبة ويكند من الجلد الفاخر",
  },
  {
    id: 8,
    name: "محفظة ريست لت",
    price: 520,
    image: "/images/wristlet.jpg",
    desc: "محفظة يد صغيرة بسوار معدني",
  },
  {
    id: 9,
    name: "حقيبة يد كلاسيك",
    price: 1350,
    image: "/images/bag.jpg",
    desc: "حقيبة يد فاخرة بتصميم خالد",
  },
  {
    id: 10,
    name: "حقيبة ظهر عصرية",
    price: 890,
    image: "/images/backpack.jpg",
    desc: "حقيبة ظهر أنيقة للاستخدام اليومي",
  },

  // ===== أحذية (10 منتجات) =====
  {
    id: 11,
    name: "كعب عالي كلاسيك",
    price: 1100,
    image: "/images/heels.jpg",
    desc: "حذاء كعب أنيق لكل المناسبات",
  },
  {
    id: 12,
    name: "سنيكرز عصري",
    price: 750,
    image: "/images/sneakers.jpg",
    desc: "حذاء رياضي مريح وأنيق",
  },
  {
    id: 13,
    name: "صندل صيفي راقي",
    price: 620,
    image: "/images/sandals.jpg",
    desc: "صندل مفتوح بتصميم عصري",
  },
  {
    id: 14,
    name: "بوت جلد أسود",
    price: 1280,
    image: "/images/boots.jpg",
    desc: "بوت كاحل بكعب عريض وأنيق",
  },
  {
    id: 15,
    name: "باليرينا كلاسيك",
    price: 480,
    image: "/images/ballet-flats.jpg",
    desc: "حذاء فلات مريح بفيونكة ناعمة",
  },
  {
    id: 16,
    name: "ميول بمقدمة مدببة",
    price: 820,
    image: "/images/mules.jpg",
    desc: "حذاء مفتوح من الخلف بكعب منخفض",
  },
  {
    id: 17,
    name: "ويدج صيفي",
    price: 720,
    image: "/images/wedges.jpg",
    desc: "صندل بكعب ويدج مريح للصيف",
  },
  {
    id: 18,
    name: "لوفر جلد كلاسيك",
    price: 950,
    image: "/images/loafers.jpg",
    desc: "حذاء لوفر أنيق للإطلالة اليومية",
  },
  {
    id: 19,
    name: "كعب بلاتفورم",
    price: 1180,
    image: "/images/platform-heels.jpg",
    desc: "كعب عالي بلاتفورم للسهرات",
  },
  {
    id: 20,
    name: "ساعة أنيقة",
    price: 1450,
    image: "/images/watch.jpg",
    desc: "ساعة يد كلاسيكية بسوار جلد",
  },

  // ===== مستحضرات تجميل (10 منتجات) =====
  {
    id: 21,
    name: "طقم أحمر شفاه",
    price: 480,
    image: "/images/lipstick.jpg",
    desc: "مجموعة ألوان ثابتة طوال اليوم",
  },
  {
    id: 22,
    name: "عطر زهري فاخر",
    price: 1400,
    image: "/images/perfume.jpg",
    desc: "عطر نسائي برائحة زهرية ساحرة",
  },
  {
    id: 23,
    name: "طقم عناية بالبشرة",
    price: 920,
    image: "/images/skincare.jpg",
    desc: "سيروم ومرطب للعناية اليومية",
  },
  {
    id: 24,
    name: "كريم أساس فاخر",
    price: 550,
    image: "/images/foundation.jpg",
    desc: "تغطية مثالية بلمسة طبيعية",
  },
  {
    id: 25,
    name: "باليت ظلال عيون",
    price: 680,
    image: "/images/eyeshadow.jpg",
    desc: "ألوان دافئة وردية للعيون",
  },
  {
    id: 26,
    name: "ماسكارا تكثيف",
    price: 350,
    image: "/images/mascara.jpg",
    desc: "ماسكارا مقاومة للماء لرموش كثيفة",
  },
  {
    id: 27,
    name: "بلاشر وردي",
    price: 380,
    image: "/images/blush.jpg",
    desc: "أحمر خدود بلمسة وردية طبيعية",
  },
  {
    id: 28,
    name: "طقم فرش مكياج",
    price: 620,
    image: "/images/brushes.jpg",
    desc: "مجموعة فرش احترافية روز قولد",
  },
  {
    id: 29,
    name: "طلاء أظافر فاخر",
    price: 280,
    image: "/images/nail-polish.jpg",
    desc: "مجموعة ألوان نود وردية أنيقة",
  },
  {
    id: 30,
    name: "سيروم شعر حريري",
    price: 450,
    image: "/images/hair-serum.jpg",
    desc: "زيت سيروم لشعر لامع وصحي",
  },
]
