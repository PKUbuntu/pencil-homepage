# 代码生成工具使用指南

本指南帮助开发者快速上手使用 Pencil 代码生成工具，将设计文件转换为 React 组件。

## 快速开始

### 1. 环境准备

确保已安装以下工具：

```bash
# Node.js 18+ 
node --version

# npm 或 pnpm
npm --version
```

### 2. 安装依赖

```bash
cd pencil-homepage
npm install
```

### 3. 项目结构

```
pencil-homepage/
├── *.pen                  # Pencil 设计文件
├── src/
│   ├── components/        # 生成的 React 组件
│   ├── pages/             # 页面组件
│   └── lib/               # 工具库
├── docs/                  # 文档
└── examples/              # 示例项目
```

## 工作流程

### 步骤 1：创建/导入设计文件

在 Pencil 中设计你的 UI 组件，导出为 `.pen` 文件。设计文件包含：

- 主题变量（颜色、字体等）
- 组件结构（Frame、Text、Button 等）
- 布局配置（Flexbox、Grid 等）
- 响应式规则

### 步骤 2：理解 .pen 文件格式

`.pen` 文件是 JSON 格式，基本结构如下：

```json
{
  "version": "2.6",
  "themes": {
    "Mode": ["Light", "Dark"],
    "Base": ["Neutral", "Gray"]
  },
  "variables": {
    "--background": {
      "type": "color",
      "value": [
        {"value": "#ffffff"},
        {"value": "#09090b", "theme": {"Mode": "Dark"}}
      ]
    }
  },
  "children": [
    {
      "type": "frame",
      "name": "Header",
      "width": 1440,
      "height": 64,
      "layout": "horizontal",
      "children": [...]
    }
  ]
}
```

### 步骤 3：转换为 React 组件

根据设计文件手动或使用脚本生成 React 组件：

```jsx
// src/components/Header.jsx
import { useTheme } from '../lib/theme'

export function Header() {
  const { theme } = useTheme()
  
  return (
    <header 
      className="flex items-center justify-between px-12 h-16"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
        Brand
      </div>
      <nav className="flex gap-8">
        <a href="/features" className="text-sm text-muted-foreground">Features</a>
        <a href="/pricing" className="text-sm text-muted-foreground">Pricing</a>
      </nav>
    </header>
  )
}
```

### 步骤 4：集成到应用

在 `App.jsx` 中导入并使用组件：

```jsx
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
```

### 步骤 5：启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

## 设计系统变量

项目使用 CSS 变量实现主题系统：

| 变量名 | 浅色模式 | 深色模式 | 用途 |
|--------|----------|----------|------|
| `--background` | #ffffff | #09090b | 背景色 |
| `--foreground` | #09090b | #fafafa | 前景色 |
| `--primary` | #18181b | #fafafa | 主色调 |
| `--muted` | #f4f4f5 | #27272a | 弱化背景 |
| `--border` | #e4e4e7 | #27272a | 边框色 |

在组件中使用：

```jsx
<div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
  内容
</div>
```

或使用 Tailwind CSS：

```jsx
<div className="bg-background text-foreground">
  内容
</div>
```

## 常见问题

### Q: 如何添加新页面？

1. 在 `src/pages/` 创建新页面组件
2. 在 `App.jsx` 中添加路由
3. 在 `Header.jsx` 中添加导航链接

### Q: 如何切换主题？

使用主题切换按钮或编程方式：

```jsx
import { useTheme } from '../lib/theme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

### Q: 如何响应式设计？

使用 Tailwind CSS 的响应式前缀：

```jsx
<div className="flex flex-col md:flex-row lg:gap-8">
  {/* 移动端垂直，桌面端水平 */}
</div>
```

## 下一步

- 阅读 [API 配置参考](./api-config-reference.md) 了解详细配置选项
- 查看 [examples/](../examples/) 中的示例项目
- 参考 [架构文档](./ARCHITECTURE.md) 了解整体设计
