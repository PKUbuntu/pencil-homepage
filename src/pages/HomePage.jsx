import Header from '../components/Header'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Weather from '../components/Weather'
import Features from '../components/Features'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Stats />
        <Weather />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage