import { Link } from 'react-router-dom'

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Simple Header */}
      <header className="h-16 border-b px-12 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">Brand</Link>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Get Started
        </button>
      </header>
      
      <main className="flex-1 py-16 px-12 md:px-48 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using our service, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">2. Use License</h2>
          <p className="text-muted-foreground leading-relaxed">
            Permission is granted to temporarily use our service for personal or commercial purposes, 
            subject to the restrictions in these terms.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for maintaining the confidentiality of your account 
            and for all activities that occur under your account.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">4. Payment Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            Paid subscriptions are billed in advance on a monthly or annual basis. 
            You may cancel at any time, and access continues until the end of your billing period.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our service is provided 'as is' without warranties of any kind. 
            We shall not be liable for any indirect, incidental, or consequential damages.
          </p>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-12 bg-muted flex justify-center">
        <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default TermsPage