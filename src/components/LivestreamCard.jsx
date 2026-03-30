function LivestreamCard() {
  const channels = [
    { name: '主会场', viewers: '8.2K' },
    { name: '分会场A', viewers: '4.1K' },
    { name: '分会场B', viewers: '2.9K' },
  ]

  return (
    <div className="flex-1 bg-occ-card border border-occ-border rounded-lg p-5 flex flex-col gap-4">
      {/* 卡片标题 */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-occ-purple rounded"></div>
        <span className="text-lg font-bold">直播间总览</span>
        <span className="text-xs text-occ-orange ml-auto">● 直播中</span>
      </div>
      
      {/* 指标数据 */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">今日观看</span>
          <span className="text-3xl font-bold text-occ-purple">15.2K</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">累计观看</span>
          <span className="text-3xl font-bold text-occ-blue">89.6K</span>
        </div>
      </div>
      
      {/* 频道列表 */}
      <div className="flex gap-2">
        {channels.map((channel, index) => (
          <div key={index} className="flex-1 bg-occ-card-light rounded px-3 py-2 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{channel.name}</span>
            <span className="text-xs font-bold">{channel.viewers}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LivestreamCard