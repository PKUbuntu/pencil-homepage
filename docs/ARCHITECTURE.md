# Pencil Homepage 架构文档

## 概述

Pencil Homepage 是一个基于 Pencil 设计文件构建的现代化响应式首页，采用 React 19 + Vite + Tailwind CSS 技术栈，支持浅色/深色主题切换。

## 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  React 19 + Tailwind CSS + Vite + React Router v7           │
├─────────────────────────────────────────────────────────────┤
│                     API Layer (BFF)                          │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │  WunderGraph    │         │  tRPC/Zod       │            │
│  │  BFF Layer      │         │  Client Layer   │            │
│  └────────┬────────┘         └────────┬────────┘            │
├───────────┼───────────────────────────┼─────────────────────┤
│           ▼                           ▼                      │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │ GraphQL APIs   │         │  REST APIs      │            │
│  │ (SpaceX API)   │         │ (Open-Meteo)    │            │
│  └─────────────────┘         └─────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 组件架构

### 页面组件 (pages/)

- `HomePage.jsx` - 首页
- `FeaturesPage.jsx` - 功能特性页
- `PricingPage.jsx` - 定价页
- `AboutPage.jsx` - 关于页
- `ContactPage.jsx` - 联系页
- `BlogPage.jsx` - 博客页
- `SignUpPage.jsx` - 注册页
- `LoginPage.jsx` - 登录页
- `DashboardPage.jsx` - 仪表盘页
- `SecurityPage.jsx` - 安全页
- `PrivacyPage.jsx` - 隐私页
- `TermsPage.jsx` - 条款页
- `IntegrationsPage.jsx` - 集成页

### 业务组件 (components/)

- `Header.jsx` - 头部导航栏
- `Hero.jsx` - 英雄区域
- `Features.jsx` - 功能特性区
- `Footer.jsx` - 页脚
- `Stats.jsx` - 统计数据
- `Weather.jsx` - 天气组件
- `TrafficCard.jsx` - 流量卡片
- `VisitStatsCard.jsx` - 访问统计卡片
- `HeatMapCard.jsx` - 热力图卡片
- `TimeWeatherCard.jsx` - 时间天气卡片
- `LivestreamCard.jsx` - 直播卡片
- `TopZonesCard.jsx` - 热门区域卡片
- `ArrivalCard.jsx` - 到达卡片

### 工具库 (lib/)

- `theme.jsx` - 主题上下文，提供浅色/深色主题切换
- `trpc.js` - tRPC 风格的 API 客户端，使用 Zod 进行类型验证

## API 层设计

### WunderGraph BFF 层

项目使用 WunderGraph 作为后端前置层（Backend-For-Frontend），统一整合多个数据源。

#### 配置 (`wundergraph/wundergraph.config.ts`)

```typescript
import { configureWunderGraphApplication, introspect } from '@wundergraph/sdk'

// GraphQL API 数据源
const spacex = introspect.graphql({
  apiNamespace: 'spacex',
  url: 'https://spacex-api.fly.dev/graphql',
})

// REST API 数据源 (Open-Meteo 天气 API)
const weather = introspect.openApi({
  apiNamespace: 'weather',
  source: {
    kind: 'url',
    url: 'https://raw.githubusercontent.com/open-meteo/open-meteo/main/openapi.yml',
  },
})

configureWunderGraphApplication({
  apis: [spacex, weather],
  server: {
    port: 9991,
    playground: true,
  },
})
```

#### 支持的数据源

| 数据源 | 类型 | 命名空间 | 用途 |
|--------|------|----------|------|
| SpaceX API | GraphQL | `spacex` | 火箭发射数据展示 |
| Open-Meteo | REST/OpenAPI | `weather` | 天气预报数据 |

### tRPC/Zod API 层

项目在客户端实现了 tRPC 风格的 API 调用，使用 Zod 进行运行时类型验证。

#### Zod Schema 示例

```typescript
import { z } from 'zod'

// 天气 API 响应 Schema
export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number().optional(),
  }),
})
```

#### tRPC-like Router

```typescript
export const weatherRouter = {
  getWeather: {
    input: z.object({
      lat: z.number().default(39.9),
      lon: z.number().default(116.4),
    }),
    query: weatherApi.getWeather,
  },
}
```

#### 天气代码映射

| 代码 | 描述 | 图标 |
|------|------|------|
| 0 | 晴 | ☀️ |
| 1 | 晴间多云 | 🌤️ |
| 2 | 多云 | ⛅ |
| 3 | 阴 | ☁️ |
| 51-55 | 小雨/中雨/大雨 | 🌧️ |
| 71-75 | 小雪/中雪/大雪 | 🌨️ |
| 95-99 | 雷暴 | ⛈️ |

## 数据流

```
用户交互
    │
    ▼
React 组件 (useEffect/useCallback)
    │
    ▼
tRPC Client (trpc.js) ──── 或 ──── WunderGraph Client
    │                                     │
    ▼                                     ▼
Zod 验证                            GraphQL/REST API
    │                                     │
    ▼                                     ▼
组件状态更新 ◄─────────────────────── 数据返回
```

## 主题系统

项目使用 CSS 变量实现主题系统：

- **浅色模式（默认）**：白色背景，深色文字
- **深色模式**：深色背景，浅色文字

主题偏好保存在 `localStorage` 中，切换时自动应用。

## 路由管理

使用 React Router v7 (HashRouter) 进行路由管理，支持 GitHub Pages 部署：

- `/` - 首页
- `/features` - 功能页
- `/pricing` - 定价页
- `/about` - 关于页
- `/contact` - 联系页
- `/blog` - 博客页
- `/signup` - 注册页
- `/login` - 登录页
- `/dashboard` - 仪表盘页
- `/security` - 安全页
- `/privacy` - 隐私页
- `/terms` - 条款页
- `/integrations` - 集成页

## 相关提交

- `d5ae9cd`: WunderGraph BFF 配置
- `e1edfdd`: tRPC/Zod API 层实现
- `6952fe0`: 天气组件 REST API 数据源
- `964fb00`: 默认城市设为上海