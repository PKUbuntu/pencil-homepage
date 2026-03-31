/**
 * 自动生成的 TypeScript 类型定义
 * 由 generator.js 根据 api-config.yaml 生成
 * 
 * ⚠️ 不要手动修改此文件
 */

// 获取指定位置的天气信息
export interface getWeatherInput {
  latitude: number;
  longitude: number;
  current?: string;
  timezone?: string;
}

export interface getWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

// 获取 SpaceX 火箭发射记录
export interface getLaunchesInput {
  limit?: number;
  offset?: number;
}

export interface getLaunchesResponse {
  launches: unknown[];
}

// 获取流量统计数据
export interface getTrafficStatsInput {
  pageId: string;
  days?: number;
}

export interface getTrafficStatsResponse {
  pageId: string;
  totalVisits: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgDuration: number;
}

// 获取用户个人资料
export interface getUserProfileInput {
  userId: string;
}

export interface getUserProfileResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

// 提交联系表单
export interface submitContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface submitContactFormResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

// App Router 类型
export type AppRouter = {
  getWeather: {
    input: getWeatherInput;
    query: (args: { input: getWeatherInput }) => Promise<getWeatherResponse>;
  };
  getLaunches: {
    input: getLaunchesInput;
    query: (args: { input: getLaunchesInput }) => Promise<getLaunchesResponse>;
  };
  getTrafficStats: {
    input: getTrafficStatsInput;
    query: (args: { input: getTrafficStatsInput }) => Promise<getTrafficStatsResponse>;
  };
  getUserProfile: {
    input: getUserProfileInput;
    query: (args: { input: getUserProfileInput }) => Promise<getUserProfileResponse>;
  };
  submitContactForm: {
    input: submitContactFormInput;
    mutation: (args: { input: submitContactFormInput }) => Promise<submitContactFormResponse>;
  };
}
