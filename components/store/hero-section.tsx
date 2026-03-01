import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center md:py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-pretty text-4xl font-bold text-foreground md:text-5xl">
          أناقتك تبدأ من هنا
        </h1>
        <p className="max-w-lg text-balance text-lg text-muted-foreground leading-relaxed">
          اكتشفي تشكيلتنا المميزة من الحقائب والأحذية ومستحضرات التجميل. كل ما تحتاجينه لإطلالة مثالية.
        </p>
      </div>
    </section>
  )
}
