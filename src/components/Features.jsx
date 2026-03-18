export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, no matter where you are."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Advanced Analytics",
      description: "Get insights that help you make data-driven decisions."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Enterprise Security",
      description: "Bank-level security to keep your data safe and compliant."
    }
  ]

  return (
    <section id="features" className="bg-muted px-6 md:px-12 py-16 md:py-20 flex flex-col gap-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Everything you need
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl">
          Powerful features to help your team work smarter and deliver faster.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full md:w-[320px] bg-card border border-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
