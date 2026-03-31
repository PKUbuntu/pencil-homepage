# API 配置参考

本文档详细说明代码生成工具的配置选项和 API 接口。

## 配置文件

### package.json

项目基础配置：

```json
{
  "name": "pencil-homepage",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.1",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "tailwindcss": "^3.4.1",
    "vite": "^8.0.0"
  }
}
```

### vite.config.js

Vite 构建配置：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pencil-homepage/', // GitHub Pages 部署路径
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  }
})
```

### tailwind.config.js

Tailwind CSS 配置：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
  plugins: [],
}
```

## .pen 文件结构

### 根节点属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `version` | string | 是 | Pencil 文件格式版本 |
| `themes` | object | 否 | 主题配置 |
| `variables` | object | 否 | CSS 变量定义 |
| `children` | array | 是 | 子元素列表 |

### themes 配置

```json
{
  "themes": {
    "Mode": ["Light", "Dark"],
    "Base": ["Neutral", "Gray", "Stone", "Zinc", "Slate"],
    "Accent": ["Default", "Red", "Rose", "Orange", "Green", "Blue", "Yellow", "Violet"]
  }
}
```

### variables 配置

每个变量定义：

```json
{
  "--background": {
    "type": "color",
    "value": [
      {"value": "#ffffff"},
      {"value": "#09090b", "theme": {"Mode": "Dark"}}
    ]
  }
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | string | 变量类型：color, number, string |
| `value` | array | 值列表，可包含主题条件 |

### 元素类型

#### Frame（容器）

```json
{
  "type": "frame",
  "name": "Header",
  "width": 1440,
  "height": 64,
  "fill": "$--background",
  "layout": "horizontal",
  "padding": [0, 48],
  "justifyContent": "space_between",
  "alignItems": "center",
  "children": []
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `width` | number/string | 宽度：数字或 "fill_container" |
| `height` | number/string | 高度：数字或 "fit_content()" |
| `layout` | string | 布局：horizontal, vertical, none |
| `padding` | array/number | 内边距 |
| `gap` | number | 子元素间距 |

#### Text（文本）

```json
{
  "type": "text",
  "name": "Title",
  "content": "Hello World",
  "fontFamily": "Inter",
  "fontSize": 24,
  "fontWeight": "bold",
  "fill": "$--foreground"
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `content` | string | 文本内容 |
| `fontFamily` | string | 字体 |
| `fontSize` | number | 字号 |
| `fontWeight` | string | 字重：normal, medium, bold |

### 布局属性

#### justifyContent

- `start` - 起始对齐
- `center` - 居中对齐
- `end` - 结束对齐
- `space_between` - 两端对齐
- `space_around` - 均匀分布

#### alignItems

- `start` - 起始对齐
- `center` - 居中对齐
- `end` - 结束对齐
- `stretch` - 拉伸填充

## 主题系统 API

### useTheme Hook

```jsx
import { useTheme } from './lib/theme'

function Component() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  // theme: 'light' | 'dark'
  // toggleTheme: () => void
  // setTheme: (theme: 'light' | 'dark') => void
}
```

### ThemeProvider

```jsx
import { ThemeProvider } from './lib/theme'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* 子组件 */}
    </ThemeProvider>
  )
}
```

## API 层配置

### tRPC 风格 API

```javascript
// src/lib/trpc.js
import { z } from 'zod'

// 定义响应 Schema
export const WeatherResponseSchema = z.object({
  temperature: z.number(),
  condition: z.string(),
  location: z.string()
})

// API 调用
export const weatherApi = {
  async getWeather(params) {
    const response = await fetch(`/api/weather?lat=${params.lat}&lon=${params.lon}`)
    const data = await response.json()
    return WeatherResponseSchema.parse(data)
  }
}
```

### WunderGraph 配置

```typescript
// wundergraph/wundergraph.config.ts
import { configureWunderGraphApplication } from '@wundergraph/sdk'

export default configureWunderGraphApplication({
  apis: {
    spacex: {
      source: {
        kind: 'graphql',
        apiURL: 'https://api.spacex.land/graphql',
      },
    },
    weather: {
      source: {
        kind: 'openapi',
        apiURL: 'https://api.open-meteo.com',
      },
    },
  },
})
```

## 部署配置

### GitHub Pages

```javascript
// vite.config.js
export default defineConfig({
  base: '/pencil-homepage/',
  build: {
    outDir: 'dist',
  }
})
```

部署命令：

```bash
npm run build
# 将 dist/ 内容推送到 gh-pages 分支
```

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_API_URL` | API 基础 URL | /api |
| `VITE_THEME_DEFAULT` | 默认主题 | light |

## 错误处理

### Zod 验证错误

```javascript
try {
  const data = ApiResponseSchema.parse(response)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('验证失败:', error.errors)
  }
}
```

### 网络错误

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('请求失败:', error)
    throw error
  }
}
```

## 相关文档

- [使用指南](./codegen-guide.md) - 快速入门
- [架构文档](./ARCHITECTURE.md) - 系统设计
- [开发指南](./CONTRIBUTING.md) - 贡献流程
