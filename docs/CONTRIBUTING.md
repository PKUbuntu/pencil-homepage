# 开发指南

## 环境配置

### 系统要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/PKUbuntu/pencil-homepage.git
cd pencil-homepage

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看页面。

### 开发服务器端口

默认端口为 `5173`。可在 `vite.config.js` 中修改：

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // 修改端口
  },
})
```

## 代码规范

### React 组件规范

1. **函数组件**：使用函数组件而非类组件
2. **Hooks**：使用 React Hooks 管理状态和副作用
3. **PropTypes**：复杂组件应添加 PropTypes 验证

```jsx
import { useState, useEffect } from 'react'

function MyComponent({ title, onClick }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {title} - {count}
    </button>
  )
}
```

### 文件命名

- 组件文件：`PascalCase.jsx`（如 `Header.jsx`）
- 工具函数：`camelCase.js`（如 `theme.jsx`）
- 页面组件：`PascalCase.jsx`（如 `HomePage.jsx`）
- 文档文件：`kebab-case.md`（如 `architecture.md`）

### 代码格式

项目使用默认的 Prettier 配置，提交前请运行：

```bash
npm run build
```

确保代码无格式错误。

## Git 分支管理

### 分支命名

- `main` - 主分支，稳定版本
- `feature/*` - 新功能分支（如 `feature/new-dashboard`）
- `fix/*` - 修复分支（如 `fix/header-responsive`）
- `docs/*` - 文档分支（如 `docs/api-guide`）

### 提交信息规范

使用语义化提交信息：

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具变更 |

#### 示例

```
feat(dashboard): add new traffic chart component

- Add TrafficCard component
- Integrate with WunderGraph weather API
- Add responsive layout

Closes #123
```

```
fix(weather): correct temperature unit conversion

The temperature was being displayed in Kelvin instead of Celsius.
Fixed the unit conversion in the weather API response handler.
```

## 目录结构

```
pencil-homepage/
├── docs/                    # 项目文档
│   ├── ARCHITECTURE.md      # 架构文档
│   └── CONTRIBUTING.md      # 开发指南
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.jsx       # 头部导航
│   │   ├── Hero.jsx         # 英雄区域
│   │   ├── Features.jsx     # 功能特性
│   │   ├── Footer.jsx       # 页脚
│   │   ├── Weather.jsx      # 天气组件
│   │   └── ...
│   ├── lib/
│   │   ├── theme.jsx         # 主题上下文
│   │   └── trpc.js           # tRPC 风格 API 层
│   ├── pages/               # 页面组件
│   │   ├── HomePage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ...
│   ├── App.jsx              # 主应用
│   ├── main.jsx             # 入口文件
│   └── index.css            # 全局样式
├── wundergraph/             # WunderGraph BFF 配置
│   ├── operations/          # WunderGraph 操作
│   └── wundergraph.config.ts
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 主题开发

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.jsx` 添加路由

```jsx
import { Route } from 'react-router-dom'
import NewPage from './pages/NewPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-page" element={<NewPage />} />
        {/* ... */}
      </Routes>
    </HashRouter>
  )
}
```

### 添加新组件

1. 在 `src/components/` 创建组件文件
2. 组件应接收 props 并返回 JSX
3. 复杂组件使用 PropTypes 验证

```jsx
import PropTypes from 'prop-types'

function MyCard({ title, children, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

MyCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
}
```

### 主题切换

使用 `src/lib/theme.jsx` 中的主题上下文：

```jsx
import { useTheme } from './lib/theme'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  )
}
```

## API 开发

### 添加新的 API 端点 (tRPC 风格)

1. 在 `src/lib/trpc.js` 中定义 Zod Schema
2. 添加 API 函数
3. 导出到 router

```javascript
import { z } from 'zod'

// 定义输入 Schema
const MyInputSchema = z.object({
  id: z.string(),
  limit: z.number().default(10),
})

// 定义输出 Schema
const MyOutputSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
})

// API 函数
export const myApi = {
  getData: async (input) => {
    const validated = MyInputSchema.parse(input)
    const response = await fetch(`/api/data/${validated.id}`)
    return MyOutputSchema.parse(await response.json())
  },
}
```

### WunderGraph 数据源

在 `wundergraph/wundergraph.config.ts` 中配置新的数据源：

```typescript
import { configureWunderGraphApplication, introspect } from '@wundergraph/sdk'

const myApi = introspect.graphql({
  apiNamespace: 'myapi',
  url: 'https://my-api.example.com/graphql',
})

configureWunderGraphApplication({
  apis: [myApi],
  server: {
    port: 9991,
  },
})
```

## 测试

### 运行测试

```bash
npm run test
```

### 构建测试

```bash
npm run build
```

确保构建无错误后再提交代码。

## 部署

### GitHub Pages

项目使用 HashRouter，支持 GitHub Pages 部署。构建产物在 `dist/` 目录。

```bash
npm run build
```

将 `dist/` 内容推送到 `gh-pages` 分支即可。

## 常见问题

### 端口被占用

```bash
npm run dev -- --port 3001
```

### 清除缓存

```bash
rm -rf node_modules/.vite
npm run dev
```

### 依赖安装失败

```bash
rm -rf node_modules package-lock.json
npm install
```