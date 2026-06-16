import express from 'express'
import Communication from '../models/Communication.js'

const router = express.Router()

// Get communications
router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const query = type && type !== 'all' ? { type } : {}
    const communications = await Communication.find(query).sort({ createdAt: -1 })
    res.json({ data: communications })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create communication
router.post('/', async (req, res) => {
  try {
    const { clientId, clientName, type, message, scheduledFor } = req.body
    const communication = new Communication({
      clientId,
      clientName,
      type,
      message,
      scheduledFor,
      createdBy: req.user.id,
      status: scheduledFor ? 'pending' : 'sent'
    })
    await communication.save()
    res.status(201).json(communication)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
