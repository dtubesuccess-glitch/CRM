# CRM Application Deployment Guide

## 🚀 Free Deployment Options

### Frontend Deployment (Vercel) - FREE

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   cd frontend
   npm run build
   ```
   - Push code to GitHub
   - Connect GitHub repo to Vercel
   - Vercel auto-deploys on every push
   - Add environment variables in Vercel dashboard:
     - `VITE_API_URL=https://your-backend-url.com/api`

3. **Access Frontend**
   - Your app will be at: `https://your-app-name.vercel.app`

### Backend Deployment (Render.com) - FREE

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Connect GitHub repository
   - Select `backend` directory
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node src/server.js`

3. **Add Environment Variables**
   - In Render dashboard, go to Environment
   - Add all variables from `.env.example`:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_secret
     TWILIO_ACCOUNT_SID=your_sid
     TWILIO_AUTH_TOKEN=your_token
     TWILIO_WHATSAPP_NUMBER=+1...
     SENDGRID_API_KEY=your_key
     SENDGRID_FROM_EMAIL=your_email
     CLIENT_URL=https://your-frontend-url
     NODE_ENV=production
     ```

4. **Deploy**
   - Click Deploy
   - Backend will be at: `https://your-backend-name.onrender.com`

### Database (MongoDB Atlas) - FREE

Already covered in SETUP.md

## 🔄 Automated Follow-ups Setup

Your backend will automatically send follow-up messages using Node Cron.

Scheduled tasks:
- Every hour: Check for pending communications
- Send emails via SendGrid
- Send WhatsApp via Twilio
- Update communication status

## 💾 Backup Strategy

### MongoDB Backup
1. Enable automatic backups in MongoDB Atlas
2. Set backup frequency to daily
3. Keep 7 days of backups

### Application Backup
- Code is backed up in GitHub
- Vercel keeps deployment history
- Render keeps deployment logs

## 📈 Monitoring

1. **Render Console**
   - View logs in real-time
   - Check for errors

2. **Vercel Dashboard**
   - Monitor build times
   - Check deployment status

3. **MongoDB Atlas**
   - Monitor connection metrics
   - Check storage usage

## 🆘 Troubleshooting Deployment

### App Not Starting
- Check logs in Render
- Verify all env variables are set
- Check MongoDB connection

### API Connection Error
- Verify CORS settings
- Check CLIENT_URL in env
- Ensure JWT_SECRET is set

### Messages Not Sending
- Verify Twilio/SendGrid credentials
- Check logs for errors
- Ensure payment method on Twilio/SendGrid

## 📱 Domain Setup (Optional)

1. **Custom Domain for Frontend**
   - Add domain in Vercel dashboard
   - Update DNS records

2. **Custom Domain for Backend**
   - Add domain in Render dashboard
   - Update DNS records

## 💰 Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Render**: 750 free monthly hours
- **MongoDB Atlas**: 512MB database
- **Twilio**: Free trial credit
- **SendGrid**: 100 emails/day free plan

For production, consider upgrading.
