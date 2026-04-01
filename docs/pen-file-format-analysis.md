# .pen 文件格式分析

> 基于 Pencil Homepage 项目中 11 个 .pen 文件的实际分析（版本 2.6）

## 1. 总体结构

`.pen` 文件是标准 JSON 格式，每个文件代表一个设计页面。顶层结构包含四个字段：

```json
{
  "version": "2.6",
  "themes": { ... },
  "variables": { ... },
  "children": [ ... ]
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `version` | `string` | ✅ | 文件格式版本号，当前所有文件均为 `"2.6"` |
| `themes` | `object` | ✅ | 主题维度定义，声明可用的主题变体 |
| `variables` | `object` | ✅ | 设计变量（Design Tokens），支持主题条件值 |
| `children` | `array` | ✅ | 顶层元素数组，包含页面的所有 Frame |

## 2. 主题系统 (`themes`)

主题系统定义了多维度的主题变体组合：

```json
{
  "themes": {
    "Mode": ["Light", "Dark"],
    "Base": ["Neutral", "Gray", "Stone", "Zinc", "Slate"],
    "Accent": ["Default", "Red", "Rose", "Orange", "Green", "Blue", "Yellow", "Violet"]
  }
}
```

### 主题维度

| 维度 | 选项 | 说明 |
|------|------|------|
| `Mode` | `Light`, `Dark` | 亮色/暗色模式 |
| `Base` | `Neutral`, `Gray`, `Stone`, `Zinc`, `Slate` | 基础色系 |
| `Accent` | `Default`, `Red`, `Rose`, `Orange`, `Green`, `Blue`, `Yellow`, `Violet` | 强调色 |

### 主题应用方式

顶层 Frame 可通过 `theme` 属性激活特定主题变体：

```json
{
  "type": "frame",
  "name": "Homepage",
  "theme": {"Mode": "Light"},
  ...
}
```

```json
{
  "type": "frame",
  "name": "Homepage Dark",
  "theme": {"Mode": "Dark"},
  ...
}
```

> **注意**：当前文件中 `Base` 和 `Accent` 维度虽已声明，但未在元素的 `theme` 属性中使用，仅 `Mode` 维度被实际引用。

## 3. 变量系统 (`variables`)

变量采用 CSS 自定义属性命名风格（`--name`），用于实现主题感知的样式值。

### 变量结构

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

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 变量类型，目前仅发现 `"color"` |
| `value` | `array` | 值列表，第一项为默认值，后续项为条件值 |
| `value[].value` | `string` | 具体值（如 `"#ffffff"`） |
| `value[].theme` | `object?` | 可选，主题匹配条件（如 `{"Mode": "Dark"}`） |

### 变量引用语法

在元素属性中使用 `$--variable-name` 语法引用变量：

```json
{"fill": "$--background"}
{"fill": "$--foreground"}
{"stroke": {"fill": "$--border", "thickness": 1}}
```

### 完整变量清单

以下为 Homepage.pen 中定义的完整变量集（其他文件为子集）：

| 变量名 | 类型 | Light 值 | Dark 值 | 用途 |
|--------|------|----------|---------|------|
| `--background` | color | `#ffffff` | `#09090b` | 页面背景色 |
| `--foreground` | color | `#09090b` | `#fafafa` | 主要文字色 |
| `--muted` | color | `#f4f4f5` | `#27272a` | 柔和背景色 |
| `--muted-foreground` | color | `#71717a` | `#a1a1aa` | 次要文字色 |
| `--card` | color | `#ffffff` | `#18181b` | 卡片背景色 |
| `--card-foreground` | color | `#09090b` | `#fafafa` | 卡片文字色 |
| `--border` | color | `#e4e4e7` | `#27272a` | 边框色 |
| `--primary` | color | `#18181b` | `#fafafa` | 主要按钮色 |
| `--primary-foreground` | color | `#fafafa` | `#18181b` | 主要按钮文字色 |
| `--secondary` | color | `#f4f4f5` | `#27272a` | 次要按钮色 |
| `--secondary-foreground` | color | `#18181b` | `#fafafa` | 次要按钮文字色 |
| `--accent` | color | `#f4f4f5` / `#3b82f6` | `#27272a` / `#3b82f6` | 强调色 |
| `--accent-foreground` | color | `#18181b` | `#fafafa` | 强调色文字 |
| `--ring` | color | `#a1a1aa` | `#71717a` | 聚焦环色 |

> **注意**：不同 .pen 文件定义的变量集合不完全相同。Homepage.pen 最全面（14 个变量），Privacy.pen 较简洁（8 个变量）。`--accent` 在 Homepage.pen 中值为 `#f4f4f5`，而在 Features.pen 等文件中值为 `#3b82f6`。

## 4. 元素类型 (`children`)

### 4.1 Frame 元素

Frame 是最核心的元素类型，既是容器也是视觉元素，类似于 CSS 的 `div` + Flexbox。

```json
{
  "type": "frame",
  "id": "XFTOk",
  "x": 0,
  "y": 0,
  "name": "Homepage",
  "width": 1440,
  "height": "fit_content(1200)",
  "fill": "$--background",
  "theme": {"Mode": "Light"},
  "layout": "vertical",
  "padding": 0,
  "children": [...]
}
```

#### Frame 完整属性表

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `"frame"` | ✅ | 元素类型标识 |
| `id` | `string` | ❌ | 唯一标识符（5 位字母数字，如 `"bi8Au"`） |
| `name` | `string` | ❌ | 人类可读名称 |
| `x` | `number` | ❌ | 画布 X 坐标（仅顶层 Frame） |
| `y` | `number` | ❌ | 画布 Y 坐标（仅顶层 Frame） |
| `width` | `number \| string` | ❌ | 宽度（见尺寸系统） |
| `height` | `number \| string` | ❌ | 高度（见尺寸系统） |
| `fill` | `string` | ❌ | 填充色（颜色值、变量引用或 `"transparent"`） |
| `stroke` | `object` | ❌ | 描边设置 |
| `cornerRadius` | `number \| array` | ❌ | 圆角半径 |
| `padding` | `number \| array` | ❌ | 内边距 |
| `gap` | `number` | ❌ | 子元素间距 |
| `layout` | `string` | ❌ | 布局方向 |
| `justifyContent` | `string` | ❌ | 主轴对齐 |
| `alignItems` | `string` | ❌ | 交叉轴对齐 |
| `flexWrap` | `string` | ❌ | 是否换行 |
| `clip` | `boolean` | ❌ | 是否裁剪溢出内容 |
| `opacity` | `number` | ❌ | 不透明度（0-1） |
| `theme` | `object` | ❌ | 主题覆盖 |
| `children` | `array` | ❌ | 子元素列表 |

### 4.2 Text 元素

Text 是纯文本内容元素，支持丰富的排版属性。

```json
{
  "type": "text",
  "id": "6KWzw",
  "name": "Hero Headline",
  "content": "Build Better Products",
  "textGrowth": "fixed-width",
  "width": "fill_container",
  "fontFamily": "Inter",
  "fontSize": 64,
  "fontWeight": "bold",
  "fill": "$--foreground",
  "textAlign": "center",
  "lineHeight": 1.1
}
```

#### Text 完整属性表

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `"text"` | ✅ | 元素类型标识 |
| `id` | `string` | ❌ | 唯一标识符 |
| `name` | `string` | ❌ | 人类可读名称 |
| `content` | `string` | ✅ | 文本内容 |
| `fontFamily` | `string` | ❌ | 字体族（所有文件均为 `"Inter"`） |
| `fontSize` | `number` | ❌ | 字体大小（px） |
| `fontWeight` | `string \| number` | ❌ | 字重（`"bold"`, `"500"`, `"600"` 等） |
| `fontStyle` | `string` | ❌ | 字体样式（如 `"italic"`） |
| `fill` | `string` | ❌ | 文字颜色 |
| `textAlign` | `string` | ❌ | 文本对齐（`"center"`） |
| `textGrowth` | `string` | ❌ | 文本增长模式（`"fixed-width"`） |
| `width` | `number \| string` | ❌ | 文本容器宽度 |
| `lineHeight` | `number` | ❌ | 行高（倍数） |
| `opacity` | `number` | ❌ | 不透明度 |

## 5. 尺寸系统

宽度和高度支持多种值类型：

| 值类型 | 示例 | 说明 |
|--------|------|------|
| 固定数值 | `1440`, `320`, `48` | 固定像素值 |
| `"fill_container"` | `"fill_container"` | 填充父容器可用空间（类似 CSS `flex: 1`） |
| `"fit_content"` | `"fit_content"` | 根据内容自适应大小 |
| `"fit_content(N)"` | `"fit_content(1200)"` | 自适应内容但有最小高度提示 |

## 6. 布局系统

### 布局方向 (`layout`)

| 值 | 说明 | CSS 等价 |
|----|------|----------|
| `"none"` | 无自动布局（绝对定位） | `position: relative` |
| `"vertical"` | 垂直排列 | `display: flex; flex-direction: column` |
| `"horizontal"` | 水平排列 | `display: flex; flex-direction: row` |

### 对齐方式

| 属性 | 可选值 | CSS 等价 |
|------|--------|----------|
| `justifyContent` | `"center"`, `"space_between"` | `justify-content` |
| `alignItems` | `"center"`, `"end"` | `align-items` |
| `flexWrap` | `"wrap"` | `flex-wrap: wrap` |

### 间距

| 属性 | 类型 | 说明 |
|------|------|------|
| `padding` | `number` | 四边等值：`padding: Npx` |
| `padding` | `[v, h]` | 垂直/水平：`padding: Vpx Hpx` |
| `padding` | `[t, r, b, l]` | 四边分别：`padding: T R B L` |
| `gap` | `number` | 子元素间距：`gap: Npx` |

## 7. 样式系统

### 填充色 (`fill`)

```json
{"fill": "#ffffff"}              // 直接颜色值（Hex）
{"fill": "$--background"}        // 变量引用
{"fill": "transparent"}          // 透明
{"fill": "#22c55e"}              // 直接颜色值（非变量）
```

### 描边 (`stroke`)

```json
{
  "stroke": {
    "fill": "$--border",    // 描边颜色（支持变量引用）
    "thickness": 1           // 描边宽度（px）
  }
}
```

```json
{
  "stroke": {
    "fill": "$--accent",
    "thickness": 2           // 可变宽度
  }
}
```

### 圆角 (`cornerRadius`)

```json
{"cornerRadius": 6}                  // 四角等值
{"cornerRadius": 100}                // 全圆角（胶囊形）
{"cornerRadius": [12, 12, 0, 0]}    // 分别设置 [左上, 右上, 右下, 左下]
```

### 不透明度 (`opacity`)

```json
{"opacity": 0.9}     // Frame 或 Text 的透明度
{"opacity": 0.8}     // 0-1 范围
{"opacity": 0.1}     // 接近全透明
```

## 8. 元素层级与命名规范

### 典型页面结构

```
Root (.pen file)
├── Frame (Page Container)
│   ├── Frame "Header"
│   │   ├── Text "Logo"
│   │   ├── Frame "Navigation"
│   │   │   ├── Text "navItem1"
│   │   │   └── Text "navItem2"
│   │   └── Frame "CTA Button"
│   │       └── Text "ctaText"
│   ├── Frame "Hero Section"
│   │   ├── Text "Headline"
│   │   ├── Text "Subline"
│   │   └── Frame "Buttons"
│   ├── Frame "Content Section"
│   │   └── Frame[] "Cards"
│   └── Frame "Footer"
│       └── Text "Copyright"
```

### 命名约定

- 顶层 Frame 以页面名称命名（如 `"Homepage"`, `"Homepage Dark"`）
- Section 级 Frame 使用描述性名称（如 `"Hero Section"`, `"Features Section"`）
- 交互元素使用功能名称（如 `"CTA Button"`, `"primaryBtn"`）
- 文本元素使用内容描述（如 `"Hero Headline"`, `"navItem1"`）

## 9. 文件统计

| 文件名 | 文件大小 | 顶层 Frame 数 | 变量数 | 最大嵌套层级 |
|--------|----------|---------------|--------|-------------|
| Homepage.pen | 38 KB | 3 | 14 | 5 |
| About.pen | 13 KB | 1 | 9 | 4 |
| Features.pen | 9 KB | 1 | 11 | 4 |
| Pricing.pen | 16 KB | 1 | 9 | 5 |
| Contact.pen | 11 KB | 1 | 9 | 5 |
| Security.pen | 8 KB | 1 | 9 | 4 |
| Blog.pen | 9 KB | 1 | 9 | 4 |
| Signup.pen | 10 KB | 1 | 9 | 5 |
| Integrations.pen | 9 KB | 1 | 9 | 3 |
| Privacy.pen | 5 KB | 1 | 8 | 3 |
| Terms.pen | 5 KB | 1 | 8 | 3 |

> Homepage.pen 包含 3 个顶层 Frame：一个空白 Frame、一个 Light 版本和一个 Dark 版本。其他文件均只有 1 个顶层 Frame。
