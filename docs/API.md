# CRM Application API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login) require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "admin@crm.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "Admin",
    "email": "admin@crm.com",
    "role": "admin"
  }
}
```

### Clients

#### Get All Clients
**GET** `/clients`

Response:
```json
{
  "data": [
    {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+919876543210",
      "status": "active",
      "lastContact": "2024-01-10T10:00:00Z",
      "nextFollowUp": "2024-02-10T10:00:00Z"
    }
  ]
}
```

#### Create Client
**POST** `/clients`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "status": "active"
}
```

#### Delete Client
**DELETE** `/clients/:id`

Response:
```json
{
  "message": "Client deleted"
}
```

#### Upload Excel File
**POST** `/clients/upload`

Form Data:
- `file`: Excel file (.xlsx or .csv)

Expected columns: Name, Email, Phone

### Communications

#### Get Communications
**GET** `/communications?type=all`

Query Parameters:
- `type`: 'all', 'email', 'whatsapp', 'scheduled'

Response:
```json
{
  "data": [
    {
      "_id": "123",
      "clientId": "456",
      "clientName": "John Doe",
      "type": "email",
      "message": "Hello John!",
      "status": "sent",
      "scheduledFor": "2024-02-10T10:00:00Z",
      "sentAt": "2024-02-10T10:05:00Z",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

#### Create Communication
**POST** `/communications`

Request:
```json
{
  "clientId": "456",
  "clientName": "John Doe",
  "type": "email",
  "message": "Hello John! How are you?",
  "scheduledFor": "2024-02-10T10:00:00Z"
}
```

### Dashboard

#### Get Stats
**GET** `/dashboard/stats`

Response:
```json
{
  "totalClients": 25,
  "activeClients": 22,
  "messagesSent": 150,
  "pendingFollowups": 5
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

## Rate Limiting

No rate limiting on free tier. Consider adding for production.

## CORS

CORS is enabled for the client URL specified in environment variables.
