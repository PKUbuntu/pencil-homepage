import { Link } from 'react-router-dom'

function PrivacyPage() {
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
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            We take your privacy seriously. This policy describes what information we collect, 
            how we use it, and your rights regarding your personal data.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you provide directly, such as your name, email, and account details. 
            We also automatically collect usage data to improve our service.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your data is used to provide and improve our services, communicate with you, 
            and ensure platform security. We never sell your personal information.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures including encryption, access controls, 
            and regular security audits to protect your data.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to access, correct, or delete your personal data. 
            Contact us at privacy@brand.com for any data-related requests.
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

export default PrivacyPage