# 完整页面示例

这个示例展示如何创建一个完整的响应式页面，包含 Header、Hero、Features 和 Footer。

## 项目结构

```
examples/full-page/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   └── theme.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 组件实现

### Header.jsx

```jsx
import { useTheme } from '../lib/theme'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Brand</a>
        
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">About</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-muted rounded-full">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
```

### Hero.jsx

```jsx
export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm mb-6">
          ✨ New Launch
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Build Beautiful Websites
          <br />
          <span className="text-muted-foreground">Faster Than Ever</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Transform your design files into production-ready React components.
          Save time and focus on what matters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90">
            Start Free Trial
          </button>
          <button className="px-6 py-3 border rounded-md font-medium hover:bg-muted">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  )
}
```

### Features.jsx

```jsx
const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Generate components in seconds, not hours.'
  },
  {
    icon: '🎨',
    title: 'Pixel Perfect',
    description: 'Your design, exactly as you imagined it.'
  },
  {
    icon: '🔄',
    title: 'Always Synced',
    description: 'Design changes automatically update your code.'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern websites.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-background rounded-lg border">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Footer.jsx

```jsx
export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Brand</h3>
            <p className="text-sm text-muted-foreground">
              Building the future of web development.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Features</a></li>
              <li><a href="#" className="hover:text-foreground">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
              <li><a href="#" className="hover:text-foreground">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 Brand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

### App.jsx

```jsx
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

## 运行示例

```bash
cd examples/full-page
npm install
npm run dev
```

访问 http://localhost:5173 查看完整页面。

## 响应式设计

示例使用 Tailwind CSS 的响应式前缀：

- `md:` - 中等屏幕（≥768px）
- `lg:` - 大屏幕（≥1024px）
- `xl:` - 超大屏幕（≥1280px）

示例：
```jsx
<div className="text-center md:text-left">
  {/* 移动端居中，桌面端左对齐 */}
</div>
```

## 主题切换

示例包含完整的浅色/深色主题支持：

```jsx
import { ThemeProvider } from './lib/theme'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  )
}
```
