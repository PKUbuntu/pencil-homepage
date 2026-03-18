export default function Hero() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-20 flex flex-col items-center justify-center gap-6 text-center">
      <div className="px-4 py-1.5 bg-muted text-foreground rounded-full text-xs font-medium">
        New Launch
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl">
        Build Better Products
      </h1>

      <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        The all-in-one platform for modern teams to collaborate, create, and ship faster.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button className="px-7 py-3.5 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:opacity-90 transition-opacity">
          Start Free Trial
        </button>
        <button className="px-7 py-3.5 bg-transparent border border-border text-foreground rounded-lg text-base font-medium hover:bg-muted transition-colors">
          Watch Demo
        </button>
      </div>
    </section>
  )
}
