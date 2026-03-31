import { z } from 'zod'
import { getWeatherResponseSchema, getLaunchesResponseSchema, getTrafficStatsResponseSchema, getUserProfileResponseSchema, submitContactFormResponseSchema } from './schemas.js'
import { getWeatherInputSchema, getLaunchesInputSchema, getTrafficStatsInputSchema, getUserProfileInputSchema, submitContactFormInputSchema } from './schemas.js'

/**
 * 自动生成的 API Client
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

export const apiClient = {
  getWeather: async (input) => {
    const validated = getWeatherInputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('https://api.open-meteo.com/v1/forecast', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return getWeatherResponseSchema.parse(data)
  },
  getLaunches: async (input) => {
    const validated = getLaunchesInputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('https://spacex-api.fly.dev/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return getLaunchesResponseSchema.parse(data)
  },
  getTrafficStats: async (input) => {
    const validated = getTrafficStatsInputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('/api/traffic', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return getTrafficStatsResponseSchema.parse(data)
  },
  getUserProfile: async (input) => {
    const validated = getUserProfileInputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return getUserProfileResponseSchema.parse(data)
  },
  submitContactForm: async (input) => {
    const validated = submitContactFormInputSchema.parse(input)
    
    // TODO: 实现实际的 API 调用
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    })
    
    const data = await response.json()
    return submitContactFormResponseSchema.parse(data)
  },
}

export default apiClient
