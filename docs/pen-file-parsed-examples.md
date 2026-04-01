# 示例 .pen 文件解析结果

> 以 Homepage.pen 的 Hero Section 为例，展示从 .pen 文件解析到最终可用数据结构的过程

## 1. 原始 .pen 片段（Hero Section）

```json
{
  "type": "frame",
  "id": "QmVJ9",
  "name": "Hero Section",
  "width": "fill_container",
  "height": "fit_content(500)",
  "fill": "$--background",
  "padding": [80, 48],
  "gap": 24,
  "justifyContent": "center",
  "alignItems": "center",
  "layout": "vertical",
  "children": [
    {
      "type": "frame",
      "id": "UWJ9m",
      "name": "Badge",
      "width": "fit_content",
      "height": "fit_content",
      "fill": "$--muted",
      "cornerRadius": 100,
      "padding": [6, 16],
      "layout": "horizontal",
      "children": [
        {
          "type": "text",
          "id": "41Okt",
          "name": "badgeText",
          "content": "New Launch",
          "fontFamily": "Inter",
          "fontSize": 12,
          "fontWeight": "500",
          "fill": "$--foreground"
        }
      ]
    },
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
    },
    {
      "type": "text",
      "id": "zlcH7",
      "name": "Hero Subline",
      "content": "The all-in-one platform for modern teams to collaborate, create, and ship faster.",
      "textGrowth": "fixed-width",
      "width": 700,
      "fontFamily": "Inter",
      "fontSize": 20,
      "fill": "$--muted-foreground",
      "textAlign": "center",
      "lineHeight": 1.5
    },
    {
      "type": "frame",
      "id": "TjdFP",
      "name": "Hero Buttons",
      "width": "fit_content",
      "height": "fit_content",
      "gap": 16,
      "layout": "horizontal",
      "children": [
        {
          "type": "frame",
          "id": "dWXES",
          "name": "primaryBtn",
          "width": "fit_content",
          "height": "fit_content",
          "fill": "$--primary",
          "cornerRadius": 8,
          "padding": [14, 28],
          "layout": "horizontal",
          "children": [
            {
              "type": "text",
              "id": "MtVqc",
              "name": "primaryBtnText",
              "content": "Start Free Trial",
              "fontFamily": "Inter",
              "fontSize": 16,
              "fontWeight": "600",
              "fill": "$--primary-foreground"
            }
          ]
        },
        {
          "type": "frame",
          "id": "vUlcw",
          "name": "secondaryBtn",
          "width": "fit_content",
          "height": "fit_content",
          "fill": "transparent",
          "stroke": {"fill": "$--border", "thickness": 1},
          "cornerRadius": 8,
          "padding": [14, 28],
          "layout": "horizontal",
          "children": [
            {
              "type": "text",
              "id": "2o1Jj",
              "name": "secondaryBtnText",
              "content": "Watch Demo",
              "fontFamily": "Inter",
              "fontSize": 16,
              "fontWeight": "500",
              "fill": "$--foreground"
            }
          ]
        }
      ]
    }
  ]
}
```

## 2. 变量解析后（Light 模式）

将所有 `$--variable` 引用替换为 Light 模式下的实际颜色值：

```json
{
  "type": "frame",
  "id": "QmVJ9",
  "name": "Hero Section",
  "width": "fill_container",
  "height": "fit_content(500)",
  "fill": "#ffffff",
  "padding": [80, 48],
  "gap": 24,
  "justifyContent": "center",
  "alignItems": "center",
  "layout": "vertical",
  "children": [
    {
      "type": "frame",
      "id": "UWJ9m",
      "name": "Badge",
      "width": "fit_content",
      "height": "fit_content",
      "fill": "#f4f4f5",
      "cornerRadius": 100,
      "padding": [6, 16],
      "layout": "horizontal",
      "children": [
        {
          "type": "text",
          "id": "41Okt",
          "name": "badgeText",
          "content": "New Launch",
          "fontFamily": "Inter",
          "fontSize": 12,
          "fontWeight": "500",
          "fill": "#09090b"
        }
      ]
    },
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
      "fill": "#09090b",
      "textAlign": "center",
      "lineHeight": 1.1
    },
    {
      "type": "text",
      "id": "zlcH7",
      "name": "Hero Subline",
      "content": "The all-in-one platform for modern teams to collaborate, create, and ship faster.",
      "textGrowth": "fixed-width",
      "width": 700,
      "fontFamily": "Inter",
      "fontSize": 20,
      "fill": "#71717a",
      "textAlign": "center",
      "lineHeight": 1.5
    },
    {
      "type": "frame",
      "id": "TjdFP",
      "name": "Hero Buttons",
      "width": "fit_content",
      "height": "fit_content",
      "gap": 16,
      "layout": "horizontal",
      "children": [
        {
          "type": "frame",
          "id": "dWXES",
          "name": "primaryBtn",
          "width": "fit_content",
          "height": "fit_content",
          "fill": "#18181b",
          "cornerRadius": 8,
          "padding": [14, 28],
          "layout": "horizontal",
          "children": [
            {
              "type": "text",
              "id": "MtVqc",
              "name": "primaryBtnText",
              "content": "Start Free Trial",
              "fontFamily": "Inter",
              "fontSize": 16,
              "fontWeight": "600",
              "fill": "#fafafa"
            }
          ]
        },
        {
          "type": "frame",
          "id": "vUlcw",
          "name": "secondaryBtn",
          "width": "fit_content",
          "height": "fit_content",
          "fill": "transparent",
          "stroke": {"fill": "#e4e4e7", "thickness": 1},
          "cornerRadius": 8,
          "padding": [14, 28],
          "layout": "horizontal",
          "children": [
            {
              "type": "text",
              "id": "2o1Jj",
              "name": "secondaryBtnText",
              "content": "Watch Demo",
              "fontFamily": "Inter",
              "fontSize": 16,
              "fontWeight": "500",
              "fill": "#09090b"
            }
          ]
        }
      ]
    }
  ]
}
```

## 3. CSS 映射结果

将解析后的数据映射到 CSS：

```css
/* Hero Section */
#QmVJ9 {
  display: flex;
  flex-direction: column;
  width: 100%; /* fill_container */
  min-height: 500px; /* fit_content(500) */
  background-color: #ffffff;
  padding: 80px 48px;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

/* Badge */
#UWJ9m {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  background-color: #f4f4f5;
  border-radius: 100px;
  padding: 6px 16px;
}

#UWJ9m .badgeText {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #09090b;
}

/* Hero Headline */
#_6KWzw {
  width: 100%; /* fill_container */
  font-family: 'Inter', sans-serif;
  font-size: 64px;
  font-weight: bold;
  color: #09090b;
  text-align: center;
  line-height: 1.1;
}

/* Hero Subline */
#zlcH7 {
  width: 700px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  color: #71717a;
  text-align: center;
  line-height: 1.5;
}

/* Hero Buttons Container */
#TjdFP {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  gap: 16px;
}

/* Primary Button */
#dWXES {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  background-color: #18181b;
  border-radius: 8px;
  padding: 14px 28px;
}

#dWXES .primaryBtnText {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fafafa;
}

/* Secondary Button */
#vUlcw {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 14px 28px;
}

#vUlcw .secondaryBtnText {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #09090b;
}
```

## 4. 元素统计（完整 Homepage.pen）

对 Homepage.pen 完整文件的解析统计：

```json
{
  "file": "Homepage.pen",
  "version": "2.6",
  "stats": {
    "totalElements": 92,
    "frameElements": 46,
    "textElements": 46,
    "maxDepth": 5,
    "topLevelFrames": 3,
    "uniqueVariablesUsed": [
      "$--background",
      "$--foreground",
      "$--muted",
      "$--muted-foreground",
      "$--card",
      "$--border",
      "$--primary",
      "$--primary-foreground"
    ],
    "fontFamilies": ["Inter"],
    "fontSizes": [12, 14, 16, 18, 20, 24, 48, 64],
    "fontWeights": ["bold", "500", "600"],
    "layouts": {
      "vertical": 14,
      "horizontal": 16,
      "none": 1
    }
  },
  "sections": [
    {"name": "Frame", "id": "bi8Au", "type": "empty-canvas"},
    {
      "name": "Homepage",
      "id": "XFTOk",
      "theme": "Light",
      "subsections": ["Header", "Hero Section", "Features Section", "Footer"]
    },
    {
      "name": "Homepage Dark",
      "id": "DrK7n",
      "theme": "Dark",
      "subsections": ["Header", "Hero Section", "Features Section", "Footer"]
    }
  ]
}
```

## 5. 跨文件变量对比

```json
{
  "variableComparison": {
    "Homepage.pen": {
      "count": 14,
      "variables": [
        "--background", "--foreground", "--muted", "--muted-foreground",
        "--card", "--card-foreground", "--border", "--primary",
        "--primary-foreground", "--secondary", "--secondary-foreground",
        "--accent", "--accent-foreground", "--ring"
      ]
    },
    "Pricing.pen": {
      "count": 9,
      "variables": [
        "--background", "--foreground", "--muted", "--muted-foreground",
        "--card", "--border", "--primary", "--primary-foreground", "--accent"
      ],
      "note": "--accent value is #3b82f6 (blue) instead of #f4f4f5"
    },
    "Privacy.pen": {
      "count": 8,
      "variables": [
        "--background", "--foreground", "--muted", "--muted-foreground",
        "--card", "--border", "--primary", "--primary-foreground"
      ]
    }
  }
}
```
