import { z } from 'zod'
import { getWeatherInputSchema, getWeatherResponseSchema, getLaunchesInputSchema, getLaunchesResponseSchema, getTrafficStatsInputSchema, getTrafficStatsResponseSchema, getUserProfileInputSchema, getUserProfileResponseSchema, submitContactFormInputSchema, submitContactFormResponseSchema } from './schemas.js'

/**
 * 自动生成的 tRPC Router
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

export const appRouter = {
  getWeather: {
    input: getWeatherInputSchema,
    query: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling getWeather with input:', input)
      return { data: 'mock response' }
    },
  },
  getLaunches: {
    input: getLaunchesInputSchema,
    query: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling getLaunches with input:', input)
      return { data: 'mock response' }
    },
  },
  getTrafficStats: {
    input: getTrafficStatsInputSchema,
    query: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling getTrafficStats with input:', input)
      return { data: 'mock response' }
    },
  },
  getUserProfile: {
    input: getUserProfileInputSchema,
    query: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling getUserProfile with input:', input)
      return { data: 'mock response' }
    },
  },
  submitContactForm: {
    input: submitContactFormInputSchema,
    mutation: async ({ input }) => {
      // TODO: 实现实际的 API 调用
      console.log('Calling submitContactForm with input:', input)
      return { data: 'mock response' }
    },
  },
}

export type AppRouter = typeof appRouter
