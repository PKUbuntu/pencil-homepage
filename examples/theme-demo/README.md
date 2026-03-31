# 主题系统示例

这个示例展示如何实现和使用浅色/深色主题切换功能。

## 主题配置

### CSS 变量定义

`src/index.css`:

```css
:root {
  /* 浅色模式 */
  --background: #ffffff;
  --foreground: #09090b;
  --card: #ffffff;
  --card-foreground: #09090b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
  --primary: #18181b;
  --primary-foreground: #fafafa;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --ring: #a1a1aa;
}

.dark {
  /* 深色模式 */
  --background: #09090b;
  --foreground: #fafafa;
  --card: #18181b;
  --card-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
  --primary: #fafafa;
  --primary-foreground: #18181b;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --ring: #71717a;
}
```

### Tailwind 配置

`tailwind.config.js`:

```javascript
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
      },
    },
  },
}
```

## Theme Hook

`src/lib/theme.jsx`:

```jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children, defaultTheme = 'light' }) {
  const [theme, setThemeState] = useState(() => {
    // 从 localStorage 读取保存的主题
    const saved = localStorage.getItem('theme')
    return saved || defaultTheme
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = (newTheme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## 使用示例

### 基础使用

```jsx
import { useTheme } from './lib/theme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
```

### 主题选择器

```jsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => setTheme('light')}
        className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
      >
        ☀️ Light
      </button>
      <button 
        onClick={() => setTheme('dark')}
        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
      >
        🌙 Dark
      </button>
    </div>
  )
}
```

### 系统偏好检测

```jsx
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    
    // 检测系统偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // 监听系统偏好变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // ... 其余代码
}
```

## 组件示例

### 主题感知卡片

```jsx
export function ThemeCard() {
  return (
    <div className="p-6 bg-card border rounded-lg">
      <h3 className="text-lg font-semibold text-card-foreground">
        主题卡片
      </h3>
      <p className="mt-2 text-muted-foreground">
        这个卡片会自动适应当前主题。
      </p>
    </div>
  )
}
```

### 主题预览网格

```jsx
export function ThemePreview() {
  const colors = [
    { name: 'Background', var: '--background' },
    { name: 'Foreground', var: '--foreground' },
    { name: 'Primary', var: '--primary' },
    { name: 'Muted', var: '--muted' },
    { name: 'Border', var: '--border' },
  ]
  
  return (
    <div className="grid grid-cols-5 gap-4">
      {colors.map((color) => (
        <div key={color.name} className="text-center">
          <div 
            className="h-16 rounded-md border mb-2"
            style={{ backgroundColor: `var(${color.var})` }}
          />
          <span className="text-xs text-muted-foreground">{color.name}</span>
        </div>
      ))}
    </div>
  )
}
```

## 完整应用示例

```jsx
import { ThemeProvider, useTheme } from './lib/theme'

function AppContent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Theme Demo</h1>
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            切换到 {theme === 'light' ? '深色' : '浅色'}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <ThemePreview />
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  )
}

export default App
```

## 运行示例

```bash
cd examples/theme-demo
npm install
npm run dev
```

访问 http://localhost:5173 查看主题切换效果。

## 最佳实践

1. **始终使用 CSS 变量** - 不要在组件中硬编码颜色值
2. **使用 Tailwind 颜色类** - 如 `bg-background` 而不是 `bg-white`
3. **保存用户偏好** - 使用 localStorage 记住用户选择
4. **支持系统偏好** - 检测 `prefers-color-scheme`
5. **测试两种主题** - 确保两种模式下都正常显示
