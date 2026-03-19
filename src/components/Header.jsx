function Header() {
  return (
    <header className="border border-occ-border rounded-lg py-4 px-5 flex items-center justify-center gap-4 bg-occ-card/50">
      {/* 左侧装饰线 */}
      <div className="w-48 h-0.5 bg-gradient-to-r from-transparent to-occ-cyan"></div>
      
      {/* 标题区 */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-wider text-white">
          智能运营中心实时数据
        </h1>
        <p className="text-sm text-occ-cyan mt-1 tracking-widest">
          INTELLIGENT OPERATIONS CENTER
        </p>
      </div>
      
      {/* 右侧装饰线 */}
      <div className="w-48 h-0.5 bg-gradient-to-l from-transparent to-occ-cyan"></div>
    </header>
  )
}

export default Header