# CRM Application - Small Business Client Management System

## 📋 Overview
A web-based CRM application designed for small businesses to manage clients, track interactions, and send automated email & WhatsApp notifications.

## ✨ Features
- **Client Management**: Upload & maintain client lists from Excel files
- **Client Status Tracking**: Monitor engagement and interaction history
- **Automated Communications**:
  - Scheduled email notifications
  - WhatsApp messages
  - Follow-up reminders after 1 month or custom dates
- **Role-Based Access**:
  - Admin: Full access to all features
  - User: View-only access
- **Responsive Web Interface**: Works on desktop and mobile
- **Cloud-Based Backend**: Hosted on Render.com (free tier)

## 🛠️ Tech Stack
- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Atlas - free tier)
- **Authentication**: JWT
- **Hosting**: Vercel (Frontend) + Render.com (Backend)
- **External APIs**:
  - Twilio (WhatsApp messaging)
  - SendGrid (Email service)
  - Firebase Storage (optional file uploads)

## 📁 Project Structure
```
crm-app/
├── frontend/           # React.js application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/            # Node.js + Express API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── docs/               # Documentation
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── SETUP.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free)
- Twilio account (WhatsApp API)
- SendGrid account (Email service)
- GitHub account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dtubesuccess-glitch/CRM.git
   cd CRM
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   npm run dev
   ```

## 🔑 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=+14155552671
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@yourcompany.com
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📊 Database Schema

### Collections
1. **users** - Application users with roles
2. **clients** - Client information and status
3. **communications** - Email/WhatsApp logs
4. **schedules** - Automated message schedules
5. **uploads** - Client list upload history

## 🔐 Authentication
- JWT-based authentication
- Admin and User roles
- Secure password hashing with bcrypt

## 📧 Automated Messaging
- Schedule messages by date or interval (30 days, 60 days, etc.)
- Send personalized emails via SendGrid
- Send WhatsApp messages via Twilio
- Track delivery status and responses

## 📁 File Upload
- Accept Excel (.xlsx, .csv) files
- Validate and parse client data
- Bulk import to database
- Error handling and reporting

## 📱 Responsive Design
- Mobile-friendly dashboard
- Touch-optimized interface
- Works on all modern browsers

## 🌐 Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions on deploying to:
- **Frontend**: Vercel (free)
- **Backend**: Render.com (free)
- **Database**: MongoDB Atlas (free)

## 📚 API Documentation

See [API.md](./docs/API.md) for complete API endpoints and usage examples.

## 🛠️ Setup Guide

See [SETUP.md](./docs/SETUP.md) for detailed setup instructions for all services.

## 📝 License
MIT

## 👥 Support
For issues or questions, please create an issue in this repository.
