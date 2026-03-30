import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrivalCard from '../components/ArrivalCard'
import LivestreamCard from '../components/LivestreamCard'
import TimeWeatherCard from '../components/TimeWeatherCard'
import VisitStatsCard from '../components/VisitStatsCard'
import TopZonesCard from '../components/TopZonesCard'
import HeatMapCard from '../components/HeatMapCard'
import TrafficCard from '../components/TrafficCard'

function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-occ-dark text-white flex flex-col">
      {/* 顶部导航栏 */}
      <nav className="h-14 bg-occ-card border-b border-occ-border px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white hover:text-occ-cyan transition-colors">
          ← 返回首页
        </Link>
        <span className="text-sm text-muted-foreground">华为智能运营中心大屏演示</span>
      </nav>

      {/* 主内容区 */}
      <div className="flex-1 p-5 flex flex-col gap-5">
        {/* 顶部标题 */}
        <header className="border border-occ-border rounded-lg py-4 px-5 flex items-center justify-center gap-4 bg-occ-card/50">
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent to-occ-cyan"></div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold tracking-wider text-white">
              智能运营中心实时数据
            </h1>
            <p className="text-sm text-occ-cyan mt-1 tracking-widest">
              INTELLIGENT OPERATIONS CENTER
            </p>
          </div>
          <div className="w-48 h-0.5 bg-gradient-to-l from-transparent to-occ-cyan"></div>
        </header>
        
        {/* KPI 卡片区 */}
        <section className="flex gap-5 h-44">
          <ArrivalCard />
          <LivestreamCard />
          <TimeWeatherCard currentTime={currentTime} />
        </section>
        
        {/* 图表区 */}
        <section className="flex-1 flex gap-5">
          <div className="w-[500px] flex flex-col gap-5">
            <VisitStatsCard />
            <TopZonesCard />
          </div>
          <HeatMapCard />
          <TrafficCard />
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
