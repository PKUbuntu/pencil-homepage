function TrafficCard() {
  const stats = [
    { label: '峰值', value: '3,856/s', color: 'text-occ-orange' },
    { label: '平均', value: '2,147/s', color: 'text-occ-blue' },
    { label: '当前', value: '2,658/s', color: 'text-occ-green' },
  ]

  return (
    <div className="w-[600px] bg-occ-card border border-occ-border rounded-lg p-4 flex flex-col gap-3">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-occ-purple rounded-sm"></div>
        <span className="text-base font-bold">实时流量监控</span>
      </div>
      
      {/* 折线图占位 */}
      <div className="flex-1 bg-occ-darker rounded-lg p-4 flex flex-col gap-4">
        {/* 简化折线图 */}
        <div className="flex-1 relative">
          <svg viewBox="0 0 400 150" className="w-full h-full">
            {/* 网格线 */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" y1={30 * i + 15} x2="400" y2={30 * i + 15} stroke="hsl(var(--occ-border))" strokeWidth="0.5" strokeDasharray="5,5" />
            ))}
            {/* 折线 */}
            <polyline
              points="0,120 50,90 100,100 150,70 200,85 250,50 300,65 350,45 400,55"
              fill="none"
              stroke="hsl(var(--occ-cyan))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 渐变填充 */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--occ-cyan))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--occ-cyan))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,120 50,90 100,100 150,70 200,85 250,50 300,65 350,45 400,55 400,150 0,150"
              fill="url(#gradient)"
            />
          </svg>
        </div>
        
        {/* 流量统计 */}
        <div className="flex justify-around pt-2 border-t border-occ-border">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrafficCard
