import express from 'express'
import Client from '../models/Client.js'
import Communication from '../models/Communication.js'

const router = express.Router()

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalClients = await Client.countDocuments()
    const activeClients = await Client.countDocuments({ status: 'active' })
    const messagesSent = await Communication.countDocuments({ status: 'sent' })
    const pendingFollowups = await Communication.countDocuments({
      status: 'pending',
      scheduledFor: { $lte: new Date() }
    })

    res.json({
      totalClients,
      activeClients,
      messagesSent,
      pendingFollowups
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
