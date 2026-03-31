/**
 * 自动生成的 Zod Schemas
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

import { z } from 'zod'

// 获取指定位置的天气信息
export const getWeatherInputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  current: z.string().optional().default('temperature_2m,weather_code,wind_speed_10m'),
  timezone: z.string().optional().default('Asia/Shanghai'),
})
export const getWeatherResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
    current: z.object({
      time: z.string(),
      temperature_2m: z.number(),
      weather_code: z.number(),
      wind_speed_10m: z.number(),
    }),
})

// 获取 SpaceX 火箭发射记录
export const getLaunchesInputSchema = z.object({
  limit: z.number().optional().default(10),
  offset: z.number().optional(),
})
export const getLaunchesResponseSchema = z.object({
    launches: z.array(z.object()),
})

// 获取流量统计数据
export const getTrafficStatsInputSchema = z.object({
  pageId: z.string(),
  days: z.number().optional().default(7),
})
export const getTrafficStatsResponseSchema = z.object({
    pageId: z.string(),
    totalVisits: z.number(),
    uniqueVisitors: z.number(),
    bounceRate: z.number(),
    avgDuration: z.number(),
})

// 获取用户个人资料
export const getUserProfileInputSchema = z.object({
  userId: z.string(),
})
export const getUserProfileResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    createdAt: z.string(),
})

// 提交联系表单
export const submitContactFormInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  subject: z.string().optional(),
  message: z.string(),
})
export const submitContactFormResponseSchema = z.object({
    success: z.boolean(),
    messageId: z.string(),
    timestamp: z.string(),
})
