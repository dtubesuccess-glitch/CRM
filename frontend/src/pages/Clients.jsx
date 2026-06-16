import { useState, useEffect } from 'react'
import { Plus, Upload, Trash2, Edit2, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'active' })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients')
      setClients(response.data.data || [])
    } catch (error) {
      toast.error('Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  const handleAddClient = async (e) => {
    e.preventDefault()
    try {
      await api.post('/clients', formData)
      toast.success('Client added successfully')
      setShowModal(false)
      setFormData({ name: '', email: '', phone: '', status: 'active' })
      fetchClients()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add client')
    }
  }

  const handleDeleteClient = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.delete(`/clients/${id}`)
      toast.success('Client deleted')
      fetchClients()
    } catch (error) {
      toast.error('Failed to delete client')
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formDataObj = new FormData()
    formDataObj.append('file', file)

    try {
      await api.post('/clients/upload', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Clients imported successfully')
      setShowUploadModal(false)
      fetchClients()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload file')
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Upload size={20} /> Upload Excel
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} /> Add Client
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{client.name}</td>
                <td className="px-6 py-4 text-gray-600">{client.email}</td>
                <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div className="text-center py-8 text-gray-500">No clients found</div>
        )}
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>
            <form onSubmit={handleAddClient} className="space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Excel Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Upload Client List</h2>
            <p className="text-gray-600 mb-4">Upload an Excel file with columns: Name, Email, Phone</p>
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileUpload}
              className="w-full border rounded-lg px-4 py-2 mb-4"
            />
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients
