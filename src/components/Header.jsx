import { Link } from 'react-router-dom'
import { useTheme } from '../lib/theme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 border-b bg-background px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">Brand</Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
        <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
        <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </header>
  )
}