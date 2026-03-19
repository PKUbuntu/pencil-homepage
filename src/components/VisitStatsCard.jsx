function VisitStatsCard() {
  return (
    <div className="h-80 bg-occ-card border border-occ-border rounded-lg p-4 flex flex-col gap-3">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-occ-cyan rounded-sm"></div>
        <span className="text-base font-bold">展厅参观统计</span>
      </div>
      
      {/* 饼图占位 */}
      <div className="flex-1 bg-occ-darker rounded-lg flex flex-col items-center justify-center gap-2">
        {/* 简化的环形图 */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0A1629" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00D9FF" strokeWidth="12" strokeDasharray="50.24 201" strokeLinecap="round" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray="201 50.24" strokeDashoffset="-50.24" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">28,654</span>
            <span className="text-xs text-gray-400">总人数</span>
          </div>
        </div>
        <span className="text-sm text-occ-cyan">今日: 5,847人</span>
      </div>
      
      {/* 图例 */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-occ-cyan rounded-sm"></div>
          <span className="text-gray-400">今日 20.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-occ-blue rounded-sm"></div>
          <span className="text-gray-400">累计 79.6%</span>
        </div>
      </div>
    </div>
  )
}

export default VisitStatsCard