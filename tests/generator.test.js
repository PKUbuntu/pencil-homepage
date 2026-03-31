/**
 * tRPC Router + Zod Schema Generator Tests
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

describe('Generator Output Tests', () => {
  const outputDir = path.join(rootDir, 'src/lib/generated')
  const configPath = path.join(rootDir, 'src/lib/api-config.yaml')
  
  let schemasContent, routerContent, typesContent, clientContent
  
  it('should generate schemas.js', () => {
    const schemasPath = path.join(outputDir, 'schemas.js')
    assert.ok(fs.existsSync(schemasPath), 'schemas.js should exist')
    schemasContent = fs.readFileSync(schemasPath, 'utf-8')
    assert.ok(schemasContent.includes("import { z } from 'zod'"), 'should import zod')
    assert.ok(schemasContent.includes('getWeatherInputSchema'), 'should have getWeatherInputSchema')
    assert.ok(schemasContent.includes('getWeatherResponseSchema'), 'should have getWeatherResponseSchema')
  })
  
  it('should generate trpc-router.js', () => {
    const routerPath = path.join(outputDir, 'trpc-router.js')
    assert.ok(fs.existsSync(routerPath), 'trpc-router.js should exist')
    routerContent = fs.readFileSync(routerPath, 'utf-8')
    assert.ok(routerContent.includes('export const appRouter'), 'should export appRouter')
    assert.ok(routerContent.includes('getWeather:'), 'should have getWeather route')
    assert.ok(routerContent.includes('submitContactForm:'), 'should have submitContactForm route')
    assert.ok(routerContent.includes('mutation:'), 'should have mutation type')
  })
  
  it('should generate types.ts', () => {
    const typesPath = path.join(outputDir, 'types.ts')
    assert.ok(fs.existsSync(typesPath), 'types.ts should exist')
    typesContent = fs.readFileSync(typesPath, 'utf-8')
    assert.ok(typesContent.includes('export interface getWeatherInput'), 'should have getWeatherInput interface')
    assert.ok(typesContent.includes('export interface getWeatherResponse'), 'should have getWeatherResponse interface')
    assert.ok(typesContent.includes('export type AppRouter'), 'should have AppRouter type')
  })
  
  it('should generate client.js', () => {
    const clientPath = path.join(outputDir, 'client.js')
    assert.ok(fs.existsSync(clientPath), 'client.js should exist')
    clientContent = fs.readFileSync(clientPath, 'utf-8')
    assert.ok(clientContent.includes('export const apiClient'), 'should export apiClient')
    assert.ok(clientContent.includes('getWeather: async'), 'should have getWeather method')
    assert.ok(clientContent.includes('submitContactForm: async'), 'should have submitContactForm method')
  })
  
  it('should have correct number of APIs (5)', () => {
    const apiCount = (schemasContent.match(/InputSchema/g) || []).length
    assert.strictEqual(apiCount, 5, 'should have 5 API schemas')
  })
  
  it('should have proper Zod validation in schemas', () => {
    assert.ok(schemasContent.includes('z.number()'), 'should have number validation')
    assert.ok(schemasContent.includes('z.string()'), 'should have string validation')
    assert.ok(schemasContent.includes('z.object('), 'should have object validation')
  })
  
  it('should have optional parameters marked correctly', () => {
    assert.ok(schemasContent.includes('.optional()'), 'should have optional markers')
    assert.ok(schemasContent.includes('.default('), 'should have default values')
  })
  
  it('should have TypeScript interfaces with correct types', () => {
    assert.ok(typesContent.includes('latitude: number'), 'should have number type')
    assert.ok(typesContent.includes('timezone: string'), 'should have string type')
    assert.ok(typesContent.includes('current?:'), 'should have optional property')
  })
  
  it('should have all generated files with proper headers', () => {
    assert.ok(schemasContent.includes('⚠️ 不要手动修改此文件'), 'schemas.js should have warning header')
    assert.ok(routerContent.includes('⚠️ 不要手动修改此文件'), 'trpc-router.js should have warning header')
    assert.ok(typesContent.includes('⚠️ 不要手动修改此文件'), 'types.ts should have warning header')
    assert.ok(clientContent.includes('⚠️ 不要手动修改此文件'), 'client.js should have warning header')
  })
})

describe('Generator Functionality Tests', () => {
  const configPath = path.join(rootDir, 'src/lib/api-config.yaml')
  
  it('should parse YAML config correctly', () => {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const config = yaml.load(configContent)
    
    assert.ok(config.apis, 'should have apis array')
    assert.strictEqual(config.apis.length, 5, 'should have 5 APIs')
    
    const weatherApi = config.apis.find(api => api.name === 'getWeather')
    assert.ok(weatherApi, 'should have getWeather API')
    assert.strictEqual(weatherApi.type, 'query', 'getWeather should be query type')
    assert.ok(weatherApi.params, 'getWeather should have params')
  })
  
  it('should have mutation type API', () => {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const config = yaml.load(configContent)
    
    const mutationApi = config.apis.find(api => api.type === 'mutation')
    assert.ok(mutationApi, 'should have at least one mutation API')
    assert.strictEqual(mutationApi.name, 'submitContactForm', 'mutation should be submitContactForm')
  })
  
  it('should have proper API structure', () => {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const config = yaml.load(configContent)
    
    for (const api of config.apis) {
      assert.ok(api.name, `API should have name: ${JSON.stringify(api)}`)
      assert.ok(api.type, `API should have type: ${api.name}`)
      assert.ok(api.method, `API should have method: ${api.name}`)
      assert.ok(api.path, `API should have path: ${api.name}`)
    }
  })
})
