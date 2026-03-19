function TopZonesCard() {
  const zones = [
    { rank: 1, name: 'AI 智能体验区', count: 2156, color: 'bg-occ-orange' },
    { rank: 2, name: '5G 展示区', count: 1892, color: 'bg-gray-500' },
    { rank: 3, name: '云计算展厅', count: 1654, color: 'bg-occ-purple' },
  ]

  return (
    <div className="flex-1 bg-occ-card border border-occ-border rounded-lg p-4 flex flex-col gap-3">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-occ-orange rounded-sm"></div>
        <span className="text-base font-bold">TOP3 热门展区</span>
      </div>
      
      {/* 排行榜 */}
      <div className="flex flex-col gap-2">
        {zones.map((zone) => (
          <div key={zone.rank} className="bg-occ-card-light rounded-md p-3 flex items-center gap-3">
            <div className={`w-7 h-7 ${zone.color} rounded flex items-center justify-center`}>
              <span className="text-sm font-bold text-occ-dark">{zone.rank}</span>
            </div>
            <span className="flex-1 text-sm">{zone.name}</span>
            <span className="text-sm font-bold text-occ-cyan">{zone.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopZonesCard