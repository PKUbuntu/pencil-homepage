import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Panel */}
      <div className="w-full md:w-[500px] bg-blue-500 p-16 flex flex-col justify-center gap-12 text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Brand</h1>
          <p className="text-lg opacity-90">Build better products, faster.</p>
        </div>
        
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <span>✓</span> Free 14-day trial
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> No credit card required
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Cancel anytime
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Full access to all features
          </li>
        </ul>

        <div className="flex flex-col gap-4">
          <p className="italic opacity-90 max-w-sm">
            "This tool has transformed how our team works. We've cut our development time in half."
          </p>
          <p className="text-sm opacity-80">— Sarah Chen, CTO at TechCorp</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-16 flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground">Get started with your free trial today</p>
          </div>

          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              className="h-11 px-4 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
            <input 
              type="email" 
              className="h-11 px-4 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Work Email"
            />
            <input 
              type="password" 
              className="h-11 px-4 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <button className="h-12 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
              Create Account
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ─────── or continue with ───────
          </p>

          <div className="flex gap-4">
            <button className="flex-1 h-11 border border-border rounded-md hover:bg-muted transition-colors">
              Google
            </button>
            <button className="flex-1 h-11 border border-border rounded-md hover:bg-muted transition-colors">
              GitHub
            </button>
          </div>

          <p className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/" className="text-blue-500 font-medium hover:underline">Sign in</Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage