function HeatMapCard() {
  const bars = [
    { height: '85%', color: 'bg-occ-cyan' },
    { height: '72%', color: 'bg-occ-blue' },
    { height: '58%', color: 'bg-occ-purple' },
    { height: '45%', color: 'bg-occ-green' },
    { height: '38%', color: 'bg-occ-orange' },
    { height: '28%', color: 'bg-gray-500' },
  ]

  return (
    <div className="flex-1 bg-occ-card border border-occ-border rounded-lg p-4 flex flex-col gap-3">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-occ-green rounded-sm"></div>
        <span className="text-base font-bold">展区热度分析</span>
        <span className="ml-auto text-xs text-gray-500">更新于 14:35</span>
      </div>
      
      {/* 柱状图 */}
      <div className="flex-1 bg-occ-darker rounded-lg p-4 flex items-end justify-around gap-4">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div 
              className={`w-full ${bar.color} rounded-t`}
              style={{ height: bar.height }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* X轴标签 */}
      <div className="flex justify-around text-xs text-gray-500 px-4">
        <span>AI区</span>
        <span>5G区</span>
        <span>云展厅</span>
        <span>数据中心</span>
        <span>安全展厅</span>
        <span>其他</span>
      </div>
    </div>
  )
}

export default HeatMapCard