import { useState, useEffect } from 'react'

// 开发环境使用 Vite 代理，生产环境直接访问 API
const SPACEX_API = import.meta.env.DEV 
  ? '/api/spacex' 
  : 'https://spacex-api.fly.dev/graphql'

const GET_STATS_QUERY = `
  query GetStats {
    launchesPast(limit: 100) {
      mission_name
      launch_success
      rocket {
        rocket_name
      }
      launch_date_utc
    }
    launchesUpcoming(limit: 1) {
      mission_name
      launch_date_utc
    }
    launchLatest {
      mission_name
      launch_success
      rocket {
        rocket_name
      }
      launch_date_utc
      details
    }
  }
`

function SkeletonCard() {
  return (
    <div className="bg-card-glass backdrop-blur-sm rounded-2xl p-8 animate-pulse">
      <div className="h-8 w-8 bg-card-glass-light rounded-lg mb-4"></div>
      <div className="h-12 w-32 bg-card-glass-light rounded mb-3"></div>
      <div className="h-4 w-24 bg-card-glass-light rounded"></div>
    </div>
  )
}

function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(SPACEX_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: GET_STATS_QUERY }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }

        const result = await response.json()

        if (result.errors) {
          throw new Error(result.errors[0].message)
        }

        const { launchesPast, launchLatest } = result.data

        const totalLaunches = launchesPast.length
        const successfulLaunches = launchesPast.filter(l => l.launch_success).length
        const successRate = totalLaunches > 0
          ? Math.round((successfulLaunches / totalLaunches) * 100)
          : 0

        const latestMission = launchLatest?.mission_name || 'N/A'
        const latestRocket = launchLatest?.rocket?.rocket_name || 'Falcon 9'
        const latestDate = launchLatest?.launch_date_utc
          ? new Date(launchLatest.launch_date_utc).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : 'N/A'

        setStats({
          totalLaunches,
          successRate,
          latestMission: `${latestMission} (${latestRocket})`,
          latestDate
        })
      } catch (err) {
        console.error('Error fetching SpaceX stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gradient-start to-gradient-end rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gradient-start to-gradient-end rounded-3xl p-12">
            <div className="text-center text-white">
              <p className="text-lg">Unable to load stats. Please try again later.</p>
              <p className="text-sm text-white/80 mt-2">Error: {error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gradient-start to-gradient-end rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Launches */}
            <div className="bg-card-glass backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🚀</div>
              <div className="text-5xl font-bold text-white mb-3">
                {stats?.totalLaunches || 0}
              </div>
              <div className="text-sm text-white/80 uppercase tracking-wide">
                Total Launches
              </div>
            </div>

            {/* Success Rate */}
            <div className="bg-card-glass backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">✅</div>
              <div className="text-5xl font-bold text-white mb-3">
                {stats?.successRate || 0}%
              </div>
              <div className="text-sm text-white/80 uppercase tracking-wide">
                Success Rate
              </div>
            </div>

            {/* Latest Mission */}
            <div className="bg-card-glass backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🛰️</div>
              <div className="text-2xl font-bold text-white mb-2 line-clamp-2">
                {stats?.latestMission || 'N/A'}
              </div>
              <div className="text-xs text-white/80 mb-3">
                {stats?.latestDate || ''}
              </div>
              <div className="text-sm text-white/80 uppercase tracking-wide">
                Latest Mission
              </div>
            </div>
          </div>

          {/* Data Source Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/80">
              📊 Data source: SpaceX API • Real-time launch statistics
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
