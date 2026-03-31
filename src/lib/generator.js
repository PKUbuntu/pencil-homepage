#!/usr/bin/env node
/**
 * tRPC Router + Zod Schema Generator
 * 
 * 根据 api-config.yaml 自动生成:
 * - Zod Schemas (schemas.js)
 * - tRPC Router (trpc-router.js)
 * - TypeScript 类型定义 (types.ts)
 * - API Client (client.js)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 使用 js-yaml 解析 YAML
function parseYAML(content) {
  return yaml.load(content)
}

// 生成 Zod Schema
function generateZodSchema(api) {
  const schemaName = `${api.name}ResponseSchema`
  
  if (!api.response || !api.response.properties || Object.keys(api.response.properties).length === 0) {
    return `export const ${schemaName} = z.any()`
  }
  
  const properties = generateZodObject(api.response.properties, 2)
  return `export const ${schemaName} = z.object({\n${properties}\n})`
}

function generateZodObject(properties, indent) {
  if (!properties) return ''
  
  const lines = []
  const indentStr = '  '.repeat(indent)
  
  for (const [key, value] of Object.entries(properties)) {
    if (value.type === 'object' && value.properties) {
      const nested = generateZodObject(value.properties, indent + 1)
      lines.push(`${indentStr}${key}: z.object({\n${nested}\n${indentStr}}),`)
    } else if (value.type === 'array') {
      const itemType = value.items?.type || 'any'
      lines.push(`${indentStr}${key}: z.array(z.${itemType}()),`)
    } else {
      const zodType = mapTypeToZod(value.type)
      lines.push(`${indentStr}${key}: z.${zodType}(),`)
    }
  }
  
  return lines.join('\n')
}

function mapTypeToZod(type) {
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    any: 'any',
  }
  return typeMap[type] || 'string'
}

// 生成 Input Schema
function generateInputSchema(api) {
  const schemaName = `${api.name}InputSchema`
  
  if (api.input && api.input.properties && Object.keys(api.input.properties).length > 0) {
    const properties = generateZodObject(api.input.properties, 2)
    return `export const ${schemaName} = z.object({\n${properties}\n})`
  }
  
  if (api.params && api.params.length > 0) {
    const lines = []
    for (const param of api.params) {
      const zodType = mapTypeToZod(param.type)
      const optional = param.required === false ? '.optional()' : ''
      const defaultVal = param.default ? `.default(${typeof param.default === 'string' ? `'${param.default}'` : param.default})` : ''
      lines.push(`  ${param.name}: z.${zodType}()${optional}${defaultVal},`)
    }
    return `export const ${schemaName} = z.object({\n${lines.join('\n')}\n})`
  }
  
  return `export const ${schemaName} = z.object({})`
}

// 生成 tRPC Router
function generateTRPCRouter(config) {
  const imports = new Set()
  const routes = []
  
  for (const api of config.apis) {
    imports.add(`${api.name}InputSchema`)
    imports.add(`${api.name}ResponseSchema`)
    
    const type = api.type === 'mutation' ? 'mutation' : 'query'
    
    routes.push(`  ${api.name}: {
    input: ${api.name}InputSchema,
    ${type}: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling ${api.name} with input:', input)
      return { data: 'mock response' }
    },
  },`)
  }
  
  return `import { z } from 'zod'
import { ${Array.from(imports).join(', ')} } from './schemas.js'

/**
 * 自动生成的 tRPC Router
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

export const appRouter = {
${routes.join('\n')}
}

export type AppRouter = typeof appRouter
`
}

// 生成 TypeScript 类型
function generateTypeScriptTypes(config) {
  const lines = [
    '/**',
    ' * 自动生成的 TypeScript 类型定义',
    ' * 由 generator.js 根据 api-config.yaml 生成',
    ' * ',
    ' * ⚠️ 不要手动修改此文件',
    ' */',
    '',
  ]
  
  for (const api of config.apis) {
    lines.push(`// ${api.description || api.name}`)
    lines.push(`export interface ${api.name}Input {`)
    
    if (api.params && api.params.length > 0) {
      for (const param of api.params) {
        const tsType = mapTypeToTS(param.type)
        const optional = param.required === false ? '?' : ''
        lines.push(`  ${param.name}${optional}: ${tsType};`)
      }
    }
    
    lines.push('}')
    lines.push('')
    
    lines.push(`export interface ${api.name}Response {`)
    if (api.response && api.response.properties && Object.keys(api.response.properties).length > 0) {
      generateTSProperties(api.response.properties, lines, 1)
    } else {
      lines.push('  data: unknown;')
    }
    lines.push('}')
    lines.push('')
  }
  
  // 生成 Router 类型
  lines.push('// App Router 类型')
  lines.push('export type AppRouter = {')
  for (const api of config.apis) {
    const type = api.type === 'mutation' ? 'mutation' : 'query'
    lines.push(`  ${api.name}: {`)
    lines.push(`    input: ${api.name}Input;`)
    lines.push(`    ${type}: (args: { input: ${api.name}Input }) => Promise<${api.name}Response>;`)
    lines.push('  };')
  }
  lines.push('}')
  lines.push('')
  
  return lines.join('\n')
}

function generateTSProperties(properties, lines, indent) {
  if (!properties) return
  
  const indentStr = '  '.repeat(indent)
  for (const [key, value] of Object.entries(properties)) {
    if (value.type === 'object' && value.properties) {
      lines.push(`${indentStr}${key}: {`)
      generateTSProperties(value.properties, lines, indent + 1)
      lines.push(`${indentStr}};`)
    } else if (value.type === 'array') {
      const itemType = value.items?.type || 'any'
      lines.push(`${indentStr}${key}: ${mapTypeToTS(itemType)}[];`)
    } else {
      lines.push(`${indentStr}${key}: ${mapTypeToTS(value.type)};`)
    }
  }
}

function mapTypeToTS(type) {
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    any: 'any',
  }
  return typeMap[type] || 'unknown'
}

// 生成 API Client
function generateAPIClient(config) {
  const imports = []
  const clientMethods = []
  
  for (const api of config.apis) {
    imports.push(`${api.name}ResponseSchema`)
    
    const type = api.type === 'mutation' ? 'mutation' : 'query'
    
    clientMethods.push(`  ${api.name}: async (input) => {
    const validated = ${api.name}InputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('${api.path}', {
      method: '${api.method}',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return ${api.name}ResponseSchema.parse(data)
  },`)
  }
  
  return `import { z } from 'zod'
import { ${imports.join(', ')} } from './schemas.js'
import { ${config.apis.map(a => `${a.name}InputSchema`).join(', ')} } from './schemas.js'

/**
 * 自动生成的 API Client
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

export const apiClient = {
${clientMethods.join('\n')}
}

export default apiClient
`
}

// 生成 Schemas 文件
function generateSchemas(config) {
  const lines = [
    '/**',
    ' * 自动生成的 Zod Schemas',
    ' * 由 generator.js 根据 api-config.yaml 生成',
    ' * ',
    ' * ⚠️ 不要手动修改此文件',
    ' */',
    '',
    "import { z } from 'zod'",
    '',
  ]
  
  for (const api of config.apis) {
    lines.push(`// ${api.description || api.name}`)
    lines.push(generateInputSchema(api))
    lines.push(generateZodSchema(api))
    lines.push('')
  }
  
  return lines.join('\n')
}

// 主函数
async function main() {
  const configPath = path.join(__dirname, 'api-config.yaml')
  const outputDir = path.join(__dirname, 'generated')
  
  console.log('🔧 tRPC Router + Zod Schema Generator')
  console.log('=====================================')
  console.log('')
  
  // 读取配置
  console.log('📄 读取配置文件：api-config.yaml')
  const configContent = fs.readFileSync(configPath, 'utf-8')
  const config = parseYAML(configContent)
  
  console.log(`✅ 解析到 ${config.apis.length} 个 API 定义`)
  console.log('')
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log('📁 创建输出目录：generated/')
  }
  
  // 生成 Schemas
  console.log('📝 生成 Zod Schemas...')
  const schemasContent = generateSchemas(config)
  fs.writeFileSync(path.join(outputDir, 'schemas.js'), schemasContent)
  console.log('   ✅ schemas.js')
  
  // 生成 tRPC Router
  console.log('📝 生成 tRPC Router...')
  const routerContent = generateTRPCRouter(config)
  fs.writeFileSync(path.join(outputDir, 'trpc-router.js'), routerContent)
  console.log('   ✅ trpc-router.js')
  
  // 生成 TypeScript 类型
  console.log('📝 生成 TypeScript 类型定义...')
  const typesContent = generateTypeScriptTypes(config)
  fs.writeFileSync(path.join(outputDir, 'types.ts'), typesContent)
  console.log('   ✅ types.ts')
  
  // 生成 API Client
  console.log('📝 生成 API Client...')
  const clientContent = generateAPIClient(config)
  fs.writeFileSync(path.join(outputDir, 'client.js'), clientContent)
  console.log('   ✅ client.js')
  
  console.log('')
  console.log('✨ 生成完成！输出文件:')
  console.log(`   📄 ${outputDir}/schemas.js`)
  console.log(`   📄 ${outputDir}/trpc-router.js`)
  console.log(`   📄 ${outputDir}/types.ts`)
  console.log(`   📄 ${outputDir}/client.js`)
  console.log('')
}

main().catch(console.error)
