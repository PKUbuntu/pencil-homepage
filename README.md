# Pencil Homepage

一个基于 Pencil 设计文件构建的现代化响应式首页，支持浅色/深色主题切换。

## 功能特性

- ✨ 现代化的 UI 设计
- 🌓 浅色/深色主题切换
- 📱 完全响应式设计
- ⚡ 基于 Vite 的快速构建
- 🎨 使用 Tailwind CSS 构建
- 🔧 React 19 + Vite

## 技术栈

- **React 19** - 用户界面库
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Inter 字体** - 现代化无衬线字体

## 开始使用

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:5173](http://localhost:5173) 查看页面。

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 预览生产构建

\`\`\`bash
npm run preview
\`\`\`

## 项目结构

\`\`\`
pencil-homepage/
├── src/
│   ├── components/       # React 组件
│   │   ├── Header.jsx    # 头部导航
│   │   ├── Hero.jsx      # 英雄区域
│   │   ├── Features.jsx  # 功能特性区域
│   │   └── Footer.jsx    # 页脚
│   ├── lib/
│   │   └── theme.jsx     # 主题上下文
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   └── index.css         # 全局样式
├── index.html            # HTML 入口
├── vite.config.js        # Vite 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── package.json          # 项目配置
\`\`\`

## 组件说明

### Header
- 包含 Logo、导航菜单和主题切换按钮
- 响应式设计，移动端自动隐藏导航菜单

### Hero
- 展示主要标题和描述
- 包含 CTA 按钮组
- 徽章显示"New Launch"

### Features
- 三张特性卡片展示核心功能
- 图标 + 标题 + 描述的卡片布局
- 响应式网格布局

### Footer
- 包含品牌信息、链接组
- 版权信息和社交媒体链接
- 多栏布局适配不同屏幕尺寸

## 主题系统

项目使用 CSS 变量实现主题系统，支持浅色和深色两种模式：

- 浅色模式（默认）：白色背景，深色文字
- 深色模式：深色背景，浅色文字

点击右上角的主题切换按钮可以在两种模式间切换，主题偏好会保存在 localStorage 中。

## 许可证

ISC
