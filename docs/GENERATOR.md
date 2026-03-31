# tRPC Router + Zod Schema 生成器

## 概述

本项目包含一个自动生成器，可以根据 YAML 配置文件自动生成：

- **Zod Schemas** - 运行时类型验证
- **tRPC Router** - 类型安全的 API 路由
- **TypeScript 类型定义** - 编译时类型检查
- **API Client** - 类型安全的 API 客户端

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API

编辑 `src/lib/api-config.yaml` 文件，定义你的 API 接口：

```yaml
apis:
  - name: getWeather
    type: query
    method: GET
    path: https://api.open-meteo.com/v1/forecast
    description: 获取天气信息
    params:
      - name: latitude
        type: number
        required: true
      - name: longitude
        type: number
        required: true
    response:
      type: object
      properties:
        temperature:
          type: number
        condition:
          type: string
```

### 3. 运行生成器

```bash
npm run generate
```

### 4. 使用生成的代码

```typescript
// 使用生成的 API Client
import { apiClient } from './lib/generated/client.js'

const weather = await apiClient.getWeather({
  latitude: 39.9,
  longitude: 116.4,
})

// 使用生成的 tRPC Router
import { appRouter } from './lib/generated/trpc-router.js'

// 使用生成的 TypeScript 类型
import type { getWeatherInput, getWeatherResponse } from './lib/generated/types.ts'
```

## 配置格式

### API 定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | API 名称（用于生成函数名） |
| type | string | ✅ | 类型：`query` 或 `mutation` |
| method | string | ✅ | HTTP 方法：`GET`, `POST`, `PUT`, `DELETE` |
| path | string | ✅ | API 路径或完整 URL |
| description | string | ❌ | API 描述 |
| params | array | ❌ | 参数列表（query 类型使用） |
| input | object | ❌ | 输入结构（mutation 类型使用） |
| response | object | ❌ | 响应结构 |

### 参数定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | 参数名 |
| type | string | ✅ | 类型：`string`, `number`, `boolean` |
| required | boolean | ❌ | 是否必填（默认 true） |
| default | any | ❌ | 默认值 |
| description | string | ❌ | 参数描述 |

### 响应/输入结构

```yaml
response:
  type: object
  properties:
    fieldName:
      type: string  # string, number, boolean, array, object
    nestedObject:
      type: object
      properties:
        nestedField:
          type: number
    arrayField:
      type: array
      items:
        type: string
```

## 生成文件说明

### schemas.js

包含所有 Zod Schema，用于运行时类型验证：

```javascript
import { z } from 'zod'

export const getWeatherInputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

export const getWeatherResponseSchema = z.object({
  temperature: z.number(),
  condition: z.string(),
})
```

### trpc-router.js

包含 tRPC 风格的 router 定义：

```javascript
export const appRouter = {
  getWeather: {
    input: getWeatherInputSchema,
    query: async ({ input }) => {
      // 实现 API 调用
    },
  },
}
```

### types.ts

包含 TypeScript 类型定义：

```typescript
export interface getWeatherInput {
  latitude: number;
  longitude: number;
}

export interface getWeatherResponse {
  temperature: number;
  condition: string;
}

export type AppRouter = {
  getWeather: {
    input: getWeatherInput;
    query: (args: { input: getWeatherInput }) => Promise<getWeatherResponse>;
  };
}
```

### client.js

包含 API 客户端实现：

```javascript
export const apiClient = {
  getWeather: async (input) => {
    const validated = getWeatherInputSchema.parse(input)
    const response = await fetch('...', { ... })
    const data = await response.json()
    return getWeatherResponseSchema.parse(data)
  },
}
```

## 运行测试

```bash
npm test
```

## 工作流程

1. 在 `api-config.yaml` 中定义 API
2. 运行 `npm run generate` 生成代码
3. 在生成的文件中实现实际的 API 调用逻辑
4. 在应用中使用生成的 client 或 router

## 注意事项

- ⚠️ **不要手动修改生成的文件** - 它们会在下次运行时被覆盖
- ✅ **在 `api-config.yaml` 中修改配置** - 这是唯一的源代码
- 🔄 **API 配置变更后重新运行生成器**

## 示例

查看 `src/lib/api-config.yaml` 获取完整的示例配置。

## 技术栈

- **js-yaml** - YAML 解析
- **Zod** - 运行时类型验证
- **TypeScript** - 类型定义
- **Node.js native test** - 测试框架
