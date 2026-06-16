# CRM Application Setup Guide

## 📋 Prerequisites

1. **Node.js** (v16+) - Download from https://nodejs.org/
2. **MongoDB Atlas** - Create free account at https://www.mongodb.com/cloud/atlas
3. **Twilio Account** - Sign up at https://www.twilio.com/
4. **SendGrid Account** - Sign up at https://sendgrid.com/
5. **Git** - Download from https://git-scm.com/

## 🚀 Step-by-Step Setup

### 1. MongoDB Atlas Setup (Free Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Try Free** → Create account
3. Create a new cluster (choose free tier)
4. Create a database user:
   - Go to **Database Access**
   - Click **Add New Database User**
   - Choose **Password** authentication
   - Create username and password
5. Whitelist IP addresses:
   - Go to **Network Access**
   - Click **Add IP Address**
   - Select **Allow access from anywhere** (0.0.0.0/0)
6. Get Connection String:
   - Click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/crm_db`

### 2. Twilio Setup (WhatsApp Messaging)

1. Go to https://www.twilio.com/
2. Click **Sign up** → Create account
3. In Dashboard:
   - Get your **Account SID** and **Auth Token**
   - Enable WhatsApp sandbox (free tier)
4. Add phone number:
   - You'll get a Twilio phone number with WhatsApp enabled
   - Format: `+14155552671` (example)

### 3. SendGrid Setup (Email Service)

1. Go to https://sendgrid.com/
2. Click **Sign up** → Create account
3. Verify email address
4. Create API Key:
   - Go to **Settings** → **API Keys**
   - Click **Create API Key**
   - Choose **Full Access**
   - Save your key securely

### 4. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# Replace:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Any random string (e.g., 'mySecretKey123')
# - TWILIO_ACCOUNT_SID: From Twilio dashboard
# - TWILIO_AUTH_TOKEN: From Twilio dashboard
# - TWILIO_WHATSAPP_NUMBER: Your Twilio WhatsApp number
# - SENDGRID_API_KEY: Your SendGrid API key
# - SENDGRID_FROM_EMAIL: Your email or domain

# Start backend
npm run dev
```

### 5. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start frontend
npm run dev
```

## 🌐 Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🔐 Demo Credentials

```
Email: admin@crm.com
Password: password123
```

**Note:** You'll need to create this user first in MongoDB or modify the database.

## 🐳 Docker Deployment (Optional)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Docker setup instructions.

## 📊 Sample Data

You can import sample clients using the Excel upload feature. Format:

```
Name | Email | Phone
--- | --- | ---
John Doe | john@example.com | +919876543210
Jane Smith | jane@example.com | +919876543211
```

## 🆘 Troubleshooting

### MongoDB Connection Error
- Check connection string format
- Verify IP is whitelisted in MongoDB Atlas
- Ensure username/password are correct

### Twilio WhatsApp Not Working
- Verify Account SID and Auth Token
- Check WhatsApp sandbox is enabled
- Ensure phone number format is correct (+1...)

### SendGrid Email Not Sending
- Verify API key is correct
- Check sender email is verified
- Ensure email address is valid

## ✅ Next Steps

1. Create admin user in MongoDB
2. Login to application
3. Add clients via UI or Excel upload
4. Schedule automated messages
5. Monitor dashboard
