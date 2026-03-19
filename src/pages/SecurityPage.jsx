import { Link } from 'react-router-dom'

const securityFeatures = [
  {
    icon: '🔐',
    title: 'Encryption at Rest',
    description: 'All data is encrypted using AES-256 encryption, ensuring your information is protected even at rest.'
  },
  {
    icon: '🛡️',
    title: 'SOC 2 Compliant',
    description: 'We maintain SOC 2 Type II certification, demonstrating our commitment to security best practices.'
  },
  {
    icon: '✅',
    title: '99.9% Uptime SLA',
    description: 'Our enterprise plan includes a 99.9% uptime guarantee with financial credits for any downtime.'
  }
]

function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Simple Header */}
      <header className="h-16 border-b px-12 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">Brand</Link>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Get Started
        </button>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-12 flex flex-col items-center gap-4">
          <span className="text-5xl">🔒</span>
          <h1 className="text-5xl font-bold">Enterprise-Grade Security</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Your data security is our top priority. We use industry-leading practices to protect your information.
          </p>
        </section>

        {/* Security Features */}
        <section className="px-12 pb-16 flex flex-col md:flex-row gap-6 justify-center">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="w-80 bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Compliance Section */}
        <section className="py-16 px-12 bg-muted flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold">Compliance & Certifications</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'].map((cert, index) => (
              <div key={index} className="w-28 h-14 bg-card border border-border rounded-lg flex items-center justify-center font-semibold">
                {cert}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-12 bg-background border-t flex justify-center">
        <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default SecurityPage