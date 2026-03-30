function TimeWeatherCard({ currentTime }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false })
  }

  const formatDate = (date) => {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${days[date.getDay()]}`
  }

  return (
    <div className="w-96 bg-occ-card border border-occ-border rounded-lg p-5 flex flex-col gap-4">
      {/* 时间显示 */}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold font-mono tracking-wider">{formatTime(currentTime)}</span>
        <span className="text-sm text-muted-foreground mt-1">{formatDate(currentTime)}</span>
      </div>
      
      {/* 天气显示 */}
      <div className="flex items-center justify-center gap-4 pt-2 border-t border-occ-border">
        <span className="text-4xl">☀️</span>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">23°C</span>
          <span className="text-xs text-muted-foreground">晴 | 湿度 45%</span>
        </div>
      </div>
    </div>
  )
}

export default TimeWeatherCard