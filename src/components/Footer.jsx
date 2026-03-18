export default function Footer() {
  return (
    <footer className="border-t bg-background px-6 md:px-12 py-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-3">
          <div className="text-xl font-bold text-foreground">Brand</div>
          <p className="text-sm text-muted-foreground">Build better products, faster.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© 2026 Brand. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#twitter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          <a href="#github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
