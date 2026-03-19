import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-12 flex flex-col items-center justify-center gap-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            We're on a mission to help teams build better products, faster.
          </p>
        </section>

        {/* Story Section */}
        <section className="py-16 px-12 flex flex-col md:flex-row gap-12 justify-center max-w-6xl mx-auto">
          <div className="flex-1 max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2020, we started with a simple idea: what if building software 
              could be as intuitive as using it? Today, we serve over 10,000 teams worldwide, 
              helping them collaborate better and ship faster.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team of 50+ engineers, designers, and product experts work remotely 
              from 15 countries, united by our passion for great software.
            </p>
          </div>
          <div className="w-full md:w-96 h-72 bg-muted rounded-xl flex-shrink-0">
            {/* Image placeholder */}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-12 bg-muted flex flex-col items-center gap-8">
          <h2 className="text-4xl font-bold">Our Values</h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-5xl">
            {/* Value Card 1 */}
            <div className="w-full md:w-72 bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
              <span className="text-4xl">🚀</span>
              <h3 className="text-xl font-semibold">Ship Fast</h3>
              <p className="text-sm text-muted-foreground">
                We believe in rapid iteration and continuous improvement. 
                Done is better than perfect.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="w-full md:w-72 bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-semibold">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Every decision we make starts with the customer. 
                Your success is our success.
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="w-full md:w-72 bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
              <span className="text-4xl">💡</span>
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                We embrace new ideas and technologies to stay ahead of the curve.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-12 flex flex-col md:flex-row gap-12 justify-center items-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl font-bold text-blue-500">10,000+</span>
            <span className="text-base text-muted-foreground">Teams using our platform</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl font-bold text-blue-500">50+</span>
            <span className="text-base text-muted-foreground">Team members</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl font-bold text-blue-500">15</span>
            <span className="text-base text-muted-foreground">Countries represented</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl font-bold text-blue-500">99.9%</span>
            <span className="text-base text-muted-foreground">Uptime guarantee</span>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-12 bg-blue-500 flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl font-bold text-white">Join our team</h2>
          <p className="text-lg text-white/90">
            We're always looking for talented people to join our mission.
          </p>
          <button className="bg-white text-blue-500 font-semibold px-7 py-3.5 rounded-lg hover:bg-gray-100 transition-colors">
            View Open Positions
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage