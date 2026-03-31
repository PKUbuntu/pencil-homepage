# 基础 Header 组件示例

这个示例展示如何从简单的 Pencil 设计文件创建一个 Header 组件。

## 设计文件

`header.pen`:

```json
{
  "version": "2.6",
  "variables": {
    "--background": {"type": "color", "value": [{"value": "#ffffff"}]},
    "--foreground": {"type": "color", "value": [{"value": "#09090b"}]},
    "--border": {"type": "color", "value": [{"value": "#e4e4e7"}]}
  },
  "children": [
    {
      "type": "frame",
      "name": "Header",
      "width": 1440,
      "height": 64,
      "fill": "$--background",
      "stroke": {"fill": "$--border", "thickness": 1},
      "layout": "horizontal",
      "padding": [0, 48],
      "justifyContent": "space_between",
      "alignItems": "center",
      "children": [
        {
          "type": "text",
          "name": "Logo",
          "content": "Brand",
          "fontFamily": "Inter",
          "fontSize": 24,
          "fontWeight": "bold",
          "fill": "$--foreground"
        },
        {
          "type": "frame",
          "name": "Nav",
          "layout": "horizontal",
          "gap": 32,
          "children": [
            {"type": "text", "name": "NavItem", "content": "Features", "fontSize": 14, "fill": "$--foreground"},
            {"type": "text", "name": "NavItem", "content": "Pricing", "fontSize": 14, "fill": "$--foreground"},
            {"type": "text", "name": "NavItem", "content": "About", "fontSize": 14, "fill": "$--foreground"}
          ]
        },
        {
          "type": "frame",
          "name": "CTA",
          "fill": "#000000",
          "cornerRadius": 6,
          "padding": [10, 20],
          "children": [
            {"type": "text", "name": "ButtonText", "content": "Get Started", "fontSize": 14, "fill": "#ffffff"}
          ]
        }
      ]
    }
  ]
}
```

## 生成的组件

`Header.jsx`:

```jsx
import { useTheme } from '../lib/theme'

export function Header() {
  const { theme } = useTheme()
  
  return (
    <header 
      className="flex items-center justify-between px-12 h-16 border-b"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Logo */}
      <div 
        className="text-2xl font-bold"
        style={{ color: 'var(--foreground)' }}
      >
        Brand
      </div>
      
      {/* Navigation */}
      <nav className="flex gap-8">
        <a 
          href="/features" 
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}
        >
          Features
        </a>
        <a 
          href="/pricing" 
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}
        >
          Pricing
        </a>
        <a 
          href="/about" 
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}
        >
          About
        </a>
      </nav>
      
      {/* CTA Button */}
      <button className="px-5 py-2.5 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
        Get Started
      </button>
    </header>
  )
}
```

## 使用方法

```jsx
// App.jsx
import { Header } from './components/Header'

function App() {
  return (
    <div>
      <Header />
      {/* 其他内容 */}
    </div>
  )
}
```

## 运行示例

```bash
cd examples/basic-header
npm install
npm run dev
```

访问 http://localhost:5173 查看效果。

## 自定义

### 修改导航项

编辑 `Header.jsx` 中的导航链接：

```jsx
<nav className="flex gap-8">
  <a href="/your-page">Your Page</a>
</nav>
```

### 修改样式

通过 CSS 变量调整颜色：

```css
:root {
  --background: #your-color;
  --foreground: #your-color;
}
```

### 添加 Logo 图片

```jsx
<img src="/logo.svg" alt="Brand" className="h-8" />
```
