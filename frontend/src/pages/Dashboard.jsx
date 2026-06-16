import { useEffect, useState } from 'react'
import { Users, MessageSquare, TrendingUp, Clock } from 'lucide-react'
import api from '../utils/api'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`bg-${color}-50 border-l-4 border-${color}-500 p-6 rounded-lg shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <Icon className={`text-${color}-500`} size={40} />
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Total Clients" value={stats?.totalClients || 0} color="blue" />
        <StatCard icon={MessageSquare} label="Messages Sent" value={stats?.messagesSent || 0} color="green" />
        <StatCard icon={TrendingUp} label="Active Clients" value={stats?.activeClients || 0} color="purple" />
        <StatCard icon={Clock} label="Pending Follow-ups" value={stats?.pendingFollowups || 0} color="orange" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <p className="text-gray-600">No recent activity yet. Start by adding clients!</p>
      </div>
    </div>
  )
}

export default Dashboard
