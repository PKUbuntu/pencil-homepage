import Header from '../components/Header'
import Footer from '../components/Footer'

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-12 flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">Have a question? We'd love to hear from you.</p>
        </section>

        {/* Contact Section */}
        <section className="px-12 pb-20 flex flex-col md:flex-row gap-12 justify-center max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="w-full md:w-[500px] bg-card border border-border rounded-xl p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                className="h-10 px-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="h-10 px-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Subject</label>
              <input 
                type="text" 
                className="h-10 px-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help?"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="h-32 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Your message..."
              />
            </div>
            <button className="bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Send Message
            </button>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-64 flex flex-col gap-8">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">hello@brand.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-medium">Office</p>
                <p className="text-sm text-muted-foreground">123 Main Street, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage