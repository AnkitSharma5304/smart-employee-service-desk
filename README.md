# 🎫 Support Ticket Management System

A comprehensive, full-stack support ticket management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This system provides advanced features for managing customer support tickets, tracking performance, and improving service quality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Features Documentation](#features-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Ticket Management
- ✅ **Create, Read, Update, Delete Tickets** - Full CRUD operations
- ✅ **Ticket Assignment** - Assign tickets to agents
- ✅ **Status Management** - Customizable ticket statuses
- ✅ **Priority Levels** - Low, Medium, High, Urgent
- ✅ **Department Organization** - Organize tickets by departments
- ✅ **Ticket History** - Track all changes and updates
- ✅ **Internal Notes** - Private notes for agents
- ✅ **Ticket Merging** - Merge duplicate tickets
- ✅ **Ticket Dependencies** - Link related tickets

### Advanced Features
- ✅ **File Attachments** - Upload and manage files (images, PDFs, documents)
- ✅ **Saved Replies** - Quick response templates with variables
- ✅ **Ticket Templates** - Pre-defined ticket templates for common issues
- ✅ **CSAT Surveys** - Customer satisfaction surveys with NPS scoring
- ✅ **Collision Detection** - Prevent multiple agents from editing same ticket
- ✅ **Real-time Updates** - WebSocket-based live notifications
- ✅ **Escalation Rules** - Automatic ticket escalation based on rules
- ✅ **Auto-close Tickets** - Automatically close resolved tickets

### Analytics & Reporting
- ✅ **Dashboard Analytics** - Overview of ticket metrics
- ✅ **Advanced Analytics** - Detailed charts and graphs
- ✅ **Custom Dashboards** - Drag-and-drop widget customization
- ✅ **PDF Reports** - Generate and download PDF reports
- ✅ **Email Scheduling** - Schedule automated report emails
- ✅ **ML Predictions** - Machine learning-based predictions
- ✅ **Anomaly Detection** - Identify unusual patterns
- ✅ **Natural Language Queries** - Ask questions in plain English

### User Management
- ✅ **Role-Based Access Control** - Admin, Agent, User roles
- ✅ **Google OAuth** - Sign in with Google
- ✅ **Email Authentication** - Traditional email/password login
- ✅ **User Profiles** - Manage user information
- ✅ **Audit Logs** - Track all user actions

### Communication
- ✅ **Ticket Replies** - Comment on tickets
- ✅ **Email Notifications** - Automated email alerts
- ✅ **Real-time Notifications** - Instant updates via WebSocket
- ✅ **Mention System** - @mention users in comments

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Node-cron** - Scheduled tasks
- **Nodemailer** - Email sending
- **PDFKit** - PDF generation

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) or use **MongoDB Atlas**
- **npm** or **yarn**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/AnkitSharma5304/smart-employee-service-desk](https://github.com/AnkitSharma5304/smart-employee-service-desk)
cd support-ticket-system

2. Install Backend Dependencies
Bash
cd backend
npm install
3. Install Frontend Dependencies
Bash
cd ../frontend
npm install
⚙️ Configuration
Backend Configuration
Create a .env file in the backend directory:

Code snippet
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ticket-system

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration 
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ankit676756@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=ankit676756@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Escalation Job Configuration
ESCALATION_CHECK_INTERVAL=*/5 * * * *
Frontend Configuration
Create a .env file in the frontend directory:

Code snippet
VITE_API_URL=http://localhost:5000/api
🏃 Running the Application
Development Mode
Terminal 1 (Backend):

Bash
cd backend
npm run dev
Terminal 2 (Frontend):

Bash
cd frontend
npm run dev
👤 Demo Credentials
Admin Account

Email: admin@example.com

Password: admin123

Agent Account

Email: agent@example.com

Password: agent123

Customer Account

Email: user@example.com

Password: user123

Seed Database
To populate the database with sample data:

Bash
cd backend
npm run seed
npm run seed:templates
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
- **Ankit Sharma** - *Full-Stack MERN Developer* - [GitHub](https://github.com/AnkitSharma5304)

🙏 Acknowledgments
React team for the amazing framework

MongoDB team for the database

All contributors who helped with this project

📞 Support
For support, email ankit676756@gmail.com or open an issue on the repository.