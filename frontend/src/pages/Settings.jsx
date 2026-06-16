import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Mail, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    followupDays: 30,
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast.success('Setting updated')
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Send email reminders to clients</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <MessageCircle className="text-green-500" />
                <div>
                  <p className="font-semibold text-gray-800">WhatsApp Notifications</p>
                  <p className="text-sm text-gray-500">Send WhatsApp messages to clients</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.whatsappNotifications}
                onChange={(e) => handleChange('whatsappNotifications', e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Follow-up Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Follow-up Settings</h2>
          </div>

          <div className="p-4 border rounded-lg">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Follow-up After (days)</label>
            <input
              type="number"
              min="1"
              max="365"
              value={settings.followupDays}
              onChange={(e) => handleChange('followupDays', parseInt(e.target.value))}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">Send follow-up messages after this many days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
