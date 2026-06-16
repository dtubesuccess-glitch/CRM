import { useEffect, useState } from 'react'
import { Mail, MessageCircle, Calendar, Check } from 'lucide-react'
import api from '../utils/api'

function Communications() {
  const [communications, setCommunications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchCommunications()
  }, [filter])

  const fetchCommunications = async () => {
    try {
      const response = await api.get(`/communications?type=${filter}`)
      setCommunications(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch communications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Communications</h1>

      <div className="flex gap-4 mb-6">
        {['all', 'email', 'whatsapp', 'scheduled'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {communications.map(comm => (
          <div key={comm._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-full ${
                  comm.type === 'email' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {comm.type === 'email' ? (
                    <Mail className={comm.type === 'email' ? 'text-blue-600' : 'text-green-600'} />
                  ) : (
                    <MessageCircle className="text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{comm.clientName}</h3>
                  <p className="text-gray-600 text-sm mt-1">{comm.message}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} /> {new Date(comm.createdAt).toLocaleDateString()}
                    </span>
                    {comm.status === 'sent' && (
                      <span className="flex items-center gap-1 text-green-600">
                        <Check size={16} /> Sent
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                comm.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {comm.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {communications.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>No communications yet</p>
        </div>
      )}
    </div>
  )
}

export default Communications
