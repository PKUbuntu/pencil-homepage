import { useState, useEffect } from 'react'
import { weatherApi, WEATHER_CODES } from '../lib/trpc.js'

// 默认城市配置
const DEFAULT_CITY = {
  name: '北京',
  lat: 39.9,
  lon: 116.4,
}

// 骨架屏组件
function WeatherSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
      <div className="h-10 w-10 bg-white/20 rounded-lg mb-4 mx-auto"></div>
      <div className="h-12 w-24 bg-white/20 rounded mb-3 mx-auto"></div>
      <div className="h-4 w-16 bg-white/20 rounded mx-auto"></div>
    </div>
  )
}

// 单个数据卡片
function StatCard({ icon, value, label, unit }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-4xl font-bold text-white mb-2">
        {value}{unit && <span className="text-2xl">{unit}</span>}
      </div>
      <div className="text-sm text-cyan-100 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

function Weather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await weatherApi.getWeather({
          lat: DEFAULT_CITY.lat,
          lon: DEFAULT_CITY.lon,
        })
        setWeather(data)
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WeatherSkeleton />
              <WeatherSkeleton />
              <WeatherSkeleton />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-8">
            <div className="text-center text-white">
              <p className="text-lg">无法加载天气数据</p>
              <p className="text-sm text-cyan-100 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const current = weather?.current
  const weatherInfo = current ? WEATHER_CODES[current.weather_code] || { desc: '未知', icon: '🌡️' } : { desc: '--', icon: '🌡️' }
  const updateTime = current?.time ? new Date(current.time).toLocaleString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '--'

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-8 shadow-xl">
          {/* 城市名称 */}
          <div className="text-center mb-6">
            <span className="text-2xl">📍</span>
            <span className="text-xl text-white font-medium ml-2">{DEFAULT_CITY.name}</span>
          </div>

          {/* 数据卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 温度 */}
            <StatCard
              icon="🌡️"
              value={current?.temperature_2m?.toFixed(1) || '--'}
              unit="°C"
              label="温度"
            />

            {/* 天气状况 */}
            <StatCard
              icon={weatherInfo.icon}
              value={weatherInfo.desc}
              label="天气"
            />

            {/* 风速 */}
            <StatCard
              icon="💨"
              value={current?.wind_speed_10m?.toFixed(1) || '--'}
              unit=" km/h"
              label="风速"
            />
          </div>

          {/* 更新时间 & 数据来源 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-cyan-100">
              🕐 更新时间: {updateTime} • 📊 数据来源: Open-Meteo API (tRPC/Zod 方式)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Weather