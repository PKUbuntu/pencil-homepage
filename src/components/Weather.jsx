import { useState, useEffect } from 'react'

// Open-Meteo REST API (北京坐标: 39.9, 116.4)
// WunderGraph BFF 会将此 REST API 转换为 GraphQL
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

// 天气代码对应的描述和图标
const WEATHER_CODES = {
  0: { desc: 'Clear', icon: '☀️' },
  1: { desc: 'Mainly Clear', icon: '🌤️' },
  2: { desc: 'Partly Cloudy', icon: '⛅' },
  3: { desc: 'Overcast', icon: '☁️' },
  45: { desc: 'Foggy', icon: '🌫️' },
  48: { desc: 'Rime Fog', icon: '🌫️' },
  51: { desc: 'Light Drizzle', icon: '🌧️' },
  53: { desc: 'Moderate Drizzle', icon: '🌧️' },
  55: { desc: 'Dense Drizzle', icon: '🌧️' },
  61: { desc: 'Slight Rain', icon: '🌧️' },
  63: { desc: 'Moderate Rain', icon: '🌧️' },
  65: { desc: 'Heavy Rain', icon: '🌧️' },
  71: { desc: 'Slight Snow', icon: '🌨️' },
  73: { desc: 'Moderate Snow', icon: '🌨️' },
  75: { desc: 'Heavy Snow', icon: '❄️' },
  77: { desc: 'Snow Grains', icon: '🌨️' },
  80: { desc: 'Slight Showers', icon: '🌦️' },
  81: { desc: 'Moderate Showers', icon: '🌦️' },
  82: { desc: 'Violent Showers', icon: '⛈️' },
  85: { desc: 'Slight Snow Showers', icon: '🌨️' },
  86: { desc: 'Heavy Snow Showers', icon: '🌨️' },
  95: { desc: 'Thunderstorm', icon: '⛈️' },
  96: { desc: 'Thunderstorm with Hail', icon: '⛈️' },
  99: { desc: 'Thunderstorm with Heavy Hail', icon: '⛈️' },
}

function WeatherSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
      <div className="h-16 w-16 bg-white/20 rounded-full mx-auto mb-4"></div>
      <div className="h-10 w-24 bg-white/20 rounded mx-auto mb-2"></div>
      <div className="h-4 w-32 bg-white/20 rounded mx-auto"></div>
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
        // 北京坐标
        const url = `${WEATHER_API}?latitude=39.9&longitude=116.4&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=Asia/Shanghai`
        
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch weather')
        
        const data = await response.json()
        
        const weatherInfo = WEATHER_CODES[data.current.weather_code] || { desc: 'Unknown', icon: '🌡️' }
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: weatherInfo.desc,
          icon: weatherInfo.icon,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          location: 'Beijing',
          time: new Date(data.current.time).toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
        })
      } catch (err) {
        console.error('Error fetching weather:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Current Weather</h2>
            <p className="text-muted-foreground mt-2">Real-time weather via REST API + WunderGraph BFF</p>
          </div>
          <div className="max-w-md mx-auto">
            <WeatherSkeleton />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">Unable to load weather data</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Current Weather</h2>
          <p className="text-muted-foreground mt-2">
            Real-time weather via 
            <span className="text-primary font-medium"> REST API</span> + 
            <span className="text-primary font-medium"> WunderGraph BFF</span>
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-center shadow-xl">
            {/* 天气图标和温度 */}
            <div className="text-7xl mb-4">{weather?.icon}</div>
            <div className="text-6xl font-bold text-white mb-2">
              {weather?.temp}°C
            </div>
            <div className="text-xl text-sky-100 mb-6">
              {weather?.condition}
            </div>
            
            {/* 详细信息 */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div>
                <div className="text-2xl mb-1">💧</div>
                <div className="text-white font-semibold">{weather?.humidity}%</div>
                <div className="text-xs text-sky-100">Humidity</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🌬️</div>
                <div className="text-white font-semibold">{weather?.windSpeed} km/h</div>
                <div className="text-xs text-sky-100">Wind</div>
              </div>
              <div>
                <div className="text-2xl mb-1">📍</div>
                <div className="text-white font-semibold">{weather?.location}</div>
                <div className="text-xs text-sky-100">{weather?.time}</div>
              </div>
            </div>
          </div>
          
          {/* 数据来源 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              📡 Data: Open-Meteo REST API • WunderGraph BFF Integration Demo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Weather