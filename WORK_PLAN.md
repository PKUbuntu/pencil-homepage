# Pencil Homepage 页面更新计划

## 项目概述

将 Homepage.pen 中的所有链接逐步实现为独立的 Frame 页面。

---

## 页面清单

### 第一阶段：核心导航页面（优先级：高）

| 序号 | 页面名称 | 文件名 | 状态 | 预计时间 |
|------|----------|--------|------|----------|
| 1 | Features | Features.pen | ✅ 已完成 | 15min |
| 2 | Pricing | Pricing.pen | ✅ 已完成 | 15min |
| 3 | About | About.pen | ✅ 已完成 | 15min |
| 4 | Contact | Contact.pen | ✅ 已完成 | 10min |

### 第二阶段：Hero 按钮/CTA 页面（优先级：高）

| 序号 | 页面名称 | 文件名 | 状态 | 预计时间 |
|------|----------|--------|------|----------|
| 5 | Sign Up / Free Trial | Signup.pen | ✅ 已完成 | 10min |
| 6 | Demo Page | Demo.pen | ⏳ 待开始 | 10min |

### 第三阶段：Footer 链接页面（优先级：中）

| 序号 | 页面名称 | 文件名 | 状态 | 预计时间 |
|------|----------|--------|------|----------|
| 7 | Integrations | Integrations.pen | ✅ 已完成 | 10min |
| 8 | Blog | Blog.pen | ✅ 已完成 | 15min |
| 9 | Careers | Careers.pen | ⏳ 待开始 | 10min |

### 第四阶段：Legal 页面（优先级：低）

| 序号 | 页面名称 | 文件名 | 状态 | 预计时间 |
|------|----------|--------|------|----------|
| 10 | Privacy Policy | Privacy.pen | ✅ 已完成 | 10min |
| 11 | Terms of Service | Terms.pen | ✅ 已完成 | 10min |
| 12 | Security | Security.pen | ✅ 已完成 | 10min |

---

## 进度追踪

- 开始时间：2026-03-19 07:30
- 预计完成：2026-03-19 09:30（2小时）
- 当前状态：进行中

### 完成记录

| 时间 | 完成内容 | 备注 |
|------|----------|------|
| 2026-03-19 07:35 | Features.pen | 6个功能卡片 + CTA区域 |
| 2026-03-19 07:38 | Pricing.pen | 3个定价方案 + FAQ区域 |
| 2026-03-19 07:42 | About.pen | 故事、价值观、统计数据 |
| 2026-03-19 07:45 | Contact.pen | 联系表单 + 信息区域 |
| 2026-03-19 07:48 | Signup.pen | 注册页面（左右布局） |
| 2026-03-19 07:52 | Privacy.pen | 隐私政策页面 |
| 2026-03-19 07:52 | Terms.pen | 服务条款页面 |
| 2026-03-19 07:55 | Security.pen | 安全页面 + 合规认证 |
| 2026-03-19 07:58 | Blog.pen | 博客列表页 + 精选文章 |
| 2026-03-19 08:00 | Integrations.pen | 集成列表页 + 200+工具 |

---

## 设计规范

### 共享变量（与 Homepage.pen 一致）

```json
{
  "--background": "#ffffff (Light) / #09090b (Dark)",
  "--foreground": "#09090b (Light) / #fafafa (Dark)",
  "--primary": "#18181b (Light) / #fafafa (Dark)",
  "--muted": "#f4f4f5 (Light) / #27272a (Dark)",
  "--border": "#e4e4e7 (Light) / #27272a (Dark)"
}
```

### 共享组件

- Header（从 Homepage 复用）
- Footer（从 Homepage 复用）
- 按钮、卡片、表单等基础组件

### 页面结构模板

```json
{
  "type": "frame",
  "name": "PageName",
  "width": 1440,
  "children": [
    { "type": "ref", "ref": "Header" },
    { "type": "frame", "name": "Main Content" },
    { "type": "ref", "ref": "Footer" }
  ]
}
```

---

## 更新日志

### 2026-03-19

- 创建工作计划
- 分析 Homepage.pen 链接结构
- 确定需要新建的页面清单（12个页面）
- **完成 About 页面前端实现**
  - 创建 AboutPage.jsx 组件
  - 添加 react-router-dom 路由支持
  - 更新 Header 组件使用 Link 导航
  - 添加 SPA GitHub Pages 支持
  - 构建并推送到 GitHub
  - GitHub: https://github.com/PKUbuntu/pencil-homepage
  - About 页面: https://pkubuntu.github.io/pencil-homepage/about