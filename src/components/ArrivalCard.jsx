function ArrivalCard() {
  const data = {
    today: 2847,
    total: 12584,
    signed: 2651,
    rate: 93.1
  }

  return (
    <div className="flex-1 bg-occ-card border border-occ-border rounded-lg p-5 flex flex-col gap-4">
      {/* 卡片标题 */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-occ-cyan rounded"></div>
        <span className="text-lg font-bold">到场进度</span>
        <span className="text-xs text-occ-green ml-auto">● 实时</span>
      </div>
      
      {/* 指标数据 */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">今日到场</span>
          <span className="text-3xl font-bold text-occ-cyan">{data.today.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">累计到场</span>
          <span className="text-3xl font-bold text-occ-blue">{data.total.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">已签到</span>
          <span className="text-3xl font-bold text-occ-green">{data.signed.toLocaleString()}</span>
        </div>
      </div>
      
      {/* 进度条 */}
      <div className="flex flex-col gap-2">
        <div className="h-2 bg-occ-darker rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-occ-cyan to-occ-blue rounded-full"
            style={{ width: `${data.rate}%` }}
          ></div>
        </div>
        <span className="text-xs text-muted-foreground">签到率 {data.rate}%</span>
      </div>
    </div>
  )
}

export default ArrivalCard
