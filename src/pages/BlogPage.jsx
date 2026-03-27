import Header from '../components/Header'
import Footer from '../components/Footer'
import Weather from '../components/Weather'

const posts = [
  {
    category: 'Product Update',
    date: 'Mar 15, 2026',
    title: 'New Features in Our Latest Release',
    description: 'A deep dive into the new collaboration features and performance improvements.',
    color: 'bg-muted'
  },
  {
    category: 'Tutorial',
    date: 'Mar 10, 2026',
    title: 'Getting Started with Team Workspaces',
    description: 'A comprehensive guide to setting up and managing team workspaces.',
    color: 'bg-blue-100'
  },
  {
    category: 'Case Study',
    date: 'Mar 5, 2026',
    title: 'How TechCorp Improved Productivity by 40%',
    description: 'A detailed look at how one team transformed their workflow.',
    color: 'bg-purple-100'
  }
]

function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-12 flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Blog</h1>
          <p className="text-xl text-muted-foreground">Insights, updates, and stories from our team.</p>
        </section>

        {/* Weather Section - tRPC/Zod Demo */}
        <Weather />

        {/* Featured Post */}
        <section className="px-12 pb-8">
          <div className="bg-blue-500 rounded-2xl p-12 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            <div className="flex-1 flex flex-col gap-4">
              <span className="text-sm text-white/80 font-medium">Featured</span>
              <h2 className="text-3xl font-bold text-white">Introducing AI-Powered Workflows</h2>
              <p className="text-white/90 max-w-md">
                We're excited to announce our latest feature that brings AI automation to your daily workflows. 
                Learn how it can save your team hours every week.
              </p>
              <span className="text-white font-medium">Read more →</span>
            </div>
            <div className="w-72 h-48 bg-white/10 rounded-xl flex-shrink-0"></div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-12 pb-20 flex flex-wrap gap-8 justify-center">
          {posts.map((post, index) => (
            <div key={index} className="w-96 bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-44 ${post.color}`}></div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-xs text-muted-foreground">{post.category} • {post.date}</span>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage