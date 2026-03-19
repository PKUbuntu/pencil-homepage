import Header from '../components/Header'
import Footer from '../components/Footer'

const features = [
  {
    icon: '🤝',
    color: 'bg-blue-500',
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. See changes instantly as they happen, no matter where your team is located.'
  },
  {
    icon: '📊',
    color: 'bg-green-500',
    title: 'Advanced Analytics',
    description: "Get deep insights into your team's performance. Track metrics, identify bottlenecks, and make data-driven decisions."
  },
  {
    icon: '🔒',
    color: 'bg-red-500',
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance. Your data is encrypted at rest and in transit, with role-based access control.'
  },
  {
    icon: '🤖',
    color: 'bg-purple-500',
    title: 'AI-Powered Automation',
    description: 'Let AI handle repetitive tasks. Smart suggestions, automated workflows, and intelligent routing save hours every week.'
  },
  {
    icon: '🔗',
    color: 'bg-amber-500',
    title: 'Custom Integrations',
    description: 'Connect with 200+ tools you already use. Slack, GitHub, Jira, Figma, and many more integrate seamlessly.'
  },
  {
    icon: '📝',
    color: 'bg-cyan-500',
    title: 'Version Control',
    description: 'Never lose work again. Automatic version history, branching, and rollback capabilities for all your projects.'
  }
]

function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-12 flex flex-col items-center justify-center gap-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center">
            Features
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Everything you need to build better products, faster.
          </p>
        </section>

        {/* Features Grid */}
        <section className="px-12 pb-20 flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="w-full md:w-96 bg-card border border-border rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="py-20 px-12 bg-muted flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of teams already using our platform.
          </p>
          <button className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-lg hover:opacity-90 transition-opacity">
            Start Free Trial
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FeaturesPage