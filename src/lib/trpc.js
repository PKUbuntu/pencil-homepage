/**
 * 模拟 tRPC 风格的 API 层
 * 使用 Zod 进行类型验证
 */

import { z } from 'zod'

// ==================== Zod Schemas ====================

// 天气 API 响应 Schema
export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  current: z.object({
    time: z.string(),
    interval: z.number().optional(),
    temperature_2m: z.number(),
    weather_code: z.number(),
    wind_speed_10m: z.number().optional(),
  }),
  current_units: z.object({
    temperature_2m: z.string(),
    weather_code: z.string(),
    wind_speed_10m: z.string().optional(),
  }).optional(),
})

// 天气代码映射
export const WEATHER_CODES = {
  0: { desc: '晴', icon: '☀️' },
  1: { desc: '晴间多云', icon: '🌤️' },
  2: { desc: '多云', icon: '⛅' },
  3: { desc: '阴', icon: '☁️' },
  45: { desc: '雾', icon: '🌫️' },
  48: { desc: '冻雾', icon: '🌫️' },
  51: { desc: '小雨', icon: '🌧️' },
  53: { desc: '中雨', icon: '🌧️' },
  55: { desc: '大雨', icon: '🌧️' },
  61: { desc: '小雨', icon: '🌧️' },
  63: { desc: '中雨', icon: '🌧️' },
  65: { desc: '大雨', icon: '🌧️' },
  71: { desc: '小雪', icon: '🌨️' },
  73: { desc: '中雪', icon: '🌨️' },
  75: { desc: '大雪', icon: '🌨️' },
  80: { desc: '阵雨', icon: '🌦️' },
  81: { desc: '中阵雨', icon: '🌦️' },
  82: { desc: '大阵雨', icon: '🌦️' },
  95: { desc: '雷暴', icon: '⛈️' },
  96: { desc: '雷暴冰雹', icon: '⛈️' },
  99: { desc: '强雷暴', icon: '⛈️' },
}

// ==================== API Functions ====================

// Open-Meteo API 配置
const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast'

/**
 * 获取天气数据
 * 模拟 tRPC 的 procedure 风格
 */
export const weatherApi = {
  getWeather: async (input) => {
    const { lat, lon } = input
    
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: 'temperature_2m,weather_code,wind_speed_10m',
      timezone: 'Asia/Shanghai',
    })
    
    const response = await fetch(`${OPEN_METEO_API}?${params}`)
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Zod 运行时验证
    const validated = WeatherResponseSchema.parse(data)
    
    return validated
  },
  
  // 获取天气描述
  getWeatherInfo: (code) => {
    return WEATHER_CODES[code] || { desc: '未知', icon: '🌡️' }
  },
}

// ==================== tRPC-like Router Definition ====================

/**
 * 这个结构模拟 tRPC 的 router 定义
 * 后续可以轻松迁移到真正的 tRPC
 */
export const weatherRouter = {
  getWeather: {
    input: z.object({
      lat: z.number().default(39.9),
      lon: z.number().default(116.4),
    }),
    query: weatherApi.getWeather,
  },
}