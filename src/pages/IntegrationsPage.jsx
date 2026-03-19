import Header from '../components/Header'
import Footer from '../components/Footer'

const integrations = [
  'Slack', 'GitHub', 'Jira', 'Figma', 'Notion', 'Linear',
  'Asana', 'Trello', 'Dropbox', 'Google Drive', 'Zoom', 'Teams'
]

function IntegrationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-12 flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Integrations</h1>
          <p className="text-xl text-muted-foreground">Connect with the tools you already use.</p>
          <span className="text-blue-500 font-medium">200+ integrations and counting</span>
        </section>

        {/* Integrations Grid */}
        <section className="px-12 pb-20 flex flex-wrap gap-6 justify-center max-w-4xl mx-auto">
          {integrations.map((name, index) => (
            <div 
              key={index}
              className="w-40 h-20 bg-card border border-border rounded-lg flex items-center justify-center font-medium hover:border-blue-500 transition-colors cursor-pointer"
            >
              {name}
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="py-16 px-12 bg-muted flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Don't see your tool?</h2>
          <p className="text-muted-foreground">We're always adding new integrations. Let us know what you need.</p>
          <button className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Request Integration
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default IntegrationsPage