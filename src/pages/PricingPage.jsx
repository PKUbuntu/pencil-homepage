import Header from '../components/Header'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out the platform',
    features: ['Up to 3 projects', '1GB storage', 'Basic analytics', 'Community support'],
    cta: 'Get Started Free',
    highlight: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for growing teams',
    features: ['Unlimited projects', '50GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited storage', 'SSO & SAML', 'Dedicated support', 'SLA guarantee', 'Custom contracts'],
    cta: 'Contact Sales',
    highlight: false
  }
]

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! The Pro plan comes with a 14-day free trial. No credit card required.'
  }
]

function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-12 flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-center">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground text-center">No hidden fees. No surprises. Cancel anytime.</p>
        </section>

        {/* Pricing Cards */}
        <section className="px-12 pb-20 flex flex-col md:flex-row gap-6 justify-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`w-full md:w-80 rounded-xl p-8 flex flex-col gap-6 ${
                plan.highlight 
                  ? 'bg-card border-2 border-blue-500' 
                  : 'bg-card border border-border'
              }`}
            >
              {plan.highlight && (
                <span className="self-start bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-medium text-muted-foreground">{plan.name}</h3>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-medium mt-auto ${
                plan.highlight 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-muted text-foreground hover:bg-muted/80'
              } transition-colors`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-12 bg-muted flex flex-col items-center gap-8">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="w-full max-w-2xl flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PricingPage