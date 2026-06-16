import express from 'express'
import Client from '../models/Client.js'
import multer from 'multer'
import XLSX from 'xlsx'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
    res.json({ data: clients })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create client
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, status } = req.body
    const client = new Client({
      name,
      email,
      phone,
      status,
      createdBy: req.user.id
    })
    await client.save()
    res.status(201).json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id)
    res.json({ message: 'Client deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload Excel file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const workbook = XLSX.read(req.file.buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(worksheet)

    const clients = data.map(row => ({
      name: row.Name || row.name,
      email: row.Email || row.email,
      phone: row.Phone || row.phone,
      status: 'active',
      createdBy: req.user.id
    }))

    await Client.insertMany(clients)
    res.json({ message: `${clients.length} clients imported successfully` })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
