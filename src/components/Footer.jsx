import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t bg-background px-6 md:px-12 py-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-3">
          <Link to="/" className="text-xl font-bold text-foreground hover:opacity-80">Brand</Link>
          <p className="text-sm text-muted-foreground">Build better products, faster.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}