export function StoreFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          {"جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()}{" "}
          {"متجر أنيق"}
        </p>
      </div>
    </footer>
  )
}
