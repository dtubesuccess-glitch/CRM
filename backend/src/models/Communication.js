import mongoose from 'mongoose'

const communicationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, required: true },
  type: { type: String, enum: ['email', 'whatsapp'], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  scheduledFor: { type: Date },
  sentAt: { type: Date },
  error: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Communication', communicationSchema)
