# 🎫 Smart Employee Service Desk

A comprehensive full-stack **Employee Support Ticket Management System** built with the **MERN stack — MongoDB, Express.js, React, and Node.js**.

The platform helps organizations manage employee support requests, assign tickets to agents, track ticket progress, communicate with users, automate support workflows, and analyze support performance through an interactive dashboard.

---

## ✨ Features

### 🎫 Core Ticket Management

- ✅ Create, view, update, and delete support tickets
- ✅ Assign tickets to support agents
- ✅ Track ticket status throughout its lifecycle
- ✅ Set ticket priority levels
- ✅ Organize tickets by department
- ✅ View ticket history and activity
- ✅ Add internal notes to tickets
- ✅ Merge duplicate tickets
- ✅ Link related tickets through dependencies

### 🚀 Advanced Ticket Features

- 📎 File attachments for tickets
- 💬 Ticket replies and conversations
- 📝 Saved reply templates
- 📋 Ticket templates for frequently reported issues
- 🔒 Ticket locking to prevent conflicting edits
- 🔄 Real-time ticket updates
- ⏰ Automatic ticket escalation
- 🤖 Automatic ticket closure for resolved tickets
- 📝 Customer satisfaction surveys

### 📊 Analytics & Reporting

- 📈 Interactive analytics dashboard
- 📊 Ticket statistics and performance metrics
- 📉 Ticket trend visualization
- 🏢 Department-wise ticket analysis
- 🎯 Priority-based analytics
- 📌 Status-based ticket overview
- 🔍 Advanced filtering
- 📄 PDF report generation
- 📧 Scheduled report emails
- 🚨 Anomaly detection
- 🤖 ML-based predictions
- 💬 Natural-language analytics queries

### 👥 User Management

- 🔐 Role-based access control
- 👨‍💼 Admin, Agent, and User roles
- 🔑 Email/password authentication
- 🔵 Google OAuth authentication
- 👤 User profile management
- 📝 Audit logs for user activity

### 💬 Communication

- 💬 Ticket replies
- 📧 Automated email notifications
- 🔔 Real-time notifications
- 📣 User mentions with `@mentions`
- ⚡ Instant updates using Socket.IO

---

## 🛠️ Tech Stack

### Frontend

- **React 18** — UI library
- **Vite** — Frontend build tool
- **React Router** — Client-side routing
- **Axios** — HTTP client
- **Tailwind CSS** — Styling
- **Radix UI / shadcn/ui** — UI components
- **Lucide React** — Icons
- **Recharts** — Data visualization
- **Socket.IO Client** — Real-time communication

### Backend

- **Node.js** — Runtime environment
- **Express.js** — Backend framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **Socket.IO** — Real-time communication
- **Nodemailer** — Email notifications
- **PDFKit** — PDF report generation
- **Node-Cron** — Scheduled tasks

### Development Tools

- Git
- GitHub
- ESLint
- Prettier
- Vite

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────┐
│                 React Frontend              │
│                                             │
│  Pages • Components • Services • Context   │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API / Socket.IO
                       ▼
┌─────────────────────────────────────────────┐
│             Node.js + Express               │
│                                             │
│ Controllers • Routes • Middleware • Auth   │
└──────────────────────┬──────────────────────┘
                       │
                       │ Mongoose
                       ▼
┌─────────────────────────────────────────────┐
│                   MongoDB                   │
│                                             │
│ Users • Tickets • Departments • Replies   │
│ Attachments • Analytics • Audit Logs       │
└─────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```text
smart-employee-service-desk/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── socket.js
│   │   │   └── upload.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── analyticsController.js
│   │   │   ├── attachmentController.js
│   │   │   ├── authController.js
│   │   │   ├── departmentController.js
│   │   │   ├── escalationController.js
│   │   │   ├── googleAuthController.js
│   │   │   ├── savedReplyController.js
│   │   │   ├── seedController.js
│   │   │   ├── statusController.js
│   │   │   ├── surveyController.js
│   │   │   ├── ticketController.js
│   │   │   └── ticketTemplateController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   │
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── AttachmentList.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SavedReplyPicker.jsx
│   │   │   └── TicketTemplatePicker.jsx
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── SECURITY.md
└── .gitignore
```

---

## 🔄 Ticket Lifecycle

```text
                 ┌─────────────────┐
                 │  Create Ticket  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │      Open       │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │     Assigned    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   In Progress   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    Resolved     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │     Closed      │
                 └─────────────────┘
```

---

## 👤 User Roles

### 🔴 Admin

Administrators have system-wide access and can:

- Manage users
- Manage departments
- Manage tickets
- Configure system settings
- View analytics
- Manage escalation rules
- View audit logs

### 🟡 Agent

Support agents can:

- View support tickets
- Assign tickets
- Update ticket status
- Change ticket priority
- Reply to users
- Add internal notes
- Upload attachments
- Manage assigned requests

### 🟢 User

Regular users can:

- Create support tickets
- View their tickets
- Track ticket status
- Reply to tickets
- Upload attachments
- Receive notifications

---

## 📊 Dashboard & Analytics

The application provides an interactive dashboard for monitoring support operations.

### Dashboard Metrics

- Total tickets
- Open tickets
- In-progress tickets
- Resolved tickets
- Closed tickets
- Tickets by department
- Tickets by priority
- Tickets by status
- Ticket trends
- Agent performance
- Resolution statistics

### Analytics

The analytics module provides detailed insights into:

- Ticket volume
- Department performance
- Priority distribution
- Status distribution
- Resolution trends
- Agent performance
- Ticket trends

Interactive charts and filtering make it easier to identify trends and monitor support performance.

---

## 🔐 Authentication & Authorization

The application provides authentication and authorization mechanisms for securing user accounts and protected resources.

### Email Authentication

Users can register and log in using:

- Email
- Password

Passwords are securely hashed using **bcrypt**.

### Google OAuth

Users can also authenticate using their Google account.

### JWT Authentication

Authenticated requests are protected using **JSON Web Tokens (JWT)**.

### Role-Based Access Control

Access to different features is controlled based on user roles:

- Admin
- Agent
- User

---

## ⚡ Real-Time Communication

The application uses **Socket.IO** for real-time communication.

Real-time functionality includes:

- New ticket notifications
- Ticket assignment updates
- Status changes
- Priority changes
- Ticket replies
- User notifications
- Agent activity updates

Users can receive updates without manually refreshing the page.

---

## 📎 File Attachments

Tickets support file attachments.

Supported use cases include uploading:

- Images
- PDFs
- Documents
- Other supported file types

The backend manages uploaded files while the frontend provides an interface for uploading and viewing attachments.

---

## 💬 Communication System

The ticket communication system allows users and agents to collaborate directly through tickets.

Features include:

- Ticket replies
- Internal notes
- Saved replies
- User mentions
- Email notifications
- Real-time notifications

### Example Workflow

```text
User
 │
 │  "Unable to access VPN"
 ▼
Support Agent
 │
 │  Reply + Resolution
 ▼
Ticket Updated
 │
 ▼
User Notification
```

---

## ⏰ Escalation & Automation

The system supports automated ticket management through configurable rules.

### Escalation

Tickets can be escalated based on predefined conditions such as:

- Priority
- Ticket age
- Status
- Department
- Assignment

### Automatic Closure

Resolved tickets can be automatically closed according to configured rules.

### Scheduled Tasks

Scheduled operations can be managed using **Node-Cron**.

---

## 📧 Email Notifications

The application supports automated email notifications.

Notifications can be triggered by events such as:

- Ticket creation
- Ticket assignment
- Ticket updates
- Ticket replies
- Status changes
- Escalations
- Mentions

Email functionality is implemented using **Nodemailer**.

---

## 🗄️ Database

The application uses **MongoDB** as its primary database with **Mongoose** as the ODM.

### Major Data Entities

- Users
- Departments
- Tickets
- Replies
- Attachments
- Audit Logs
- Escalation Rules
- Saved Replies
- Ticket Templates
- Surveys

### Mongoose Provides

- Schema definitions
- Validation
- Database interaction
- Relationships
- Query functionality

---

# ⚙️ Installation

## Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/) 18+
- npm
- MongoDB
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/AnkitSharma5304/smart-employee-service-desk.git
cd smart-employee-service-desk
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

### Environment Variables

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

Additional variables may be required for features such as Google OAuth and email notifications:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

Start the backend development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 🌱 Database Seeding

The project includes scripts for initializing database data.

From the backend directory:

```bash
npm run seed
```

Ticket templates can be initialized using:

```bash
npm run seed:templates
```

---

# 🔌 API Overview

The backend provides RESTful APIs for managing the application.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Tickets

```text
GET    /api/tickets
GET    /api/tickets/:id
POST   /api/tickets
PUT    /api/tickets/:id
DELETE /api/tickets/:id
```

### Departments

```text
GET    /api/departments
POST   /api/departments
PUT    /api/departments/:id
DELETE /api/departments/:id
```

### Analytics

```text
GET    /api/analytics
```

> API routes may vary depending on the enabled application modules.

---

## 👤 Demo Credentials

### Admin Account

```text
Email:    admin@example.com
Password: admin123
Role:     Admin

Email:    agent@example.com
Password: agent123
Role:     Agent

Email:    user@example.com
Password: user123
Role:     Employee
```


# 🧪 Development & Testing

### Run Frontend Linting

```bash
cd frontend
npm run lint
```

### Build Frontend

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

# 🚀 Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

The production files will be generated inside:

```text
frontend/dist/
```

The Node.js backend can be deployed to a suitable Node.js hosting environment.

---

# 🔒 Security

Security considerations implemented in the application include:

- JWT authentication
- Password hashing using bcrypt
- Role-based access control
- Authentication middleware
- Request validation
- Centralized error handling
- Protected frontend routes
- Audit logging
- Environment-based configuration

## Important

**Never commit sensitive credentials to GitHub.**

Do not commit:

```text
.env
API keys
Database credentials
OAuth secrets
SMTP credentials
JWT secrets
```

Use environment variables instead.

---

# 📝 Environment Variables

Create a `.env` file locally.

Example:

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

An `.env.example` file can be used to document required variables without exposing actual secrets.

---

# 📸 Screenshots

Add application screenshots here to showcase the interface.

Recommended screenshots:

```text
screenshots/
├── login.png
├── dashboard.png
├── ticket-list.png
├── ticket-details.png
├── ticket-create.png
└── analytics.png
```

Then reference them in the README:

```markdown
![Dashboard](screenshots/dashboard.png)

![Ticket Management](screenshots/ticket-list.png)
```

---

# 🛣️ Future Improvements

Potential future improvements include:

- 🤖 AI-powered ticket categorization
- 🧠 AI-based ticket priority prediction
- 🔍 Advanced ticket search
- 📊 More detailed analytics
- ⏱️ SLA monitoring
- 📱 Improved mobile experience
- 🔔 Custom notification preferences
- 🔗 Third-party integrations
- 📈 Advanced agent performance tracking
- 🧪 Expanded automated testing
- ☁️ Cloud file storage
- 📡 Improved observability and monitoring

---

# 🤝 Contributing

Contributions are welcome!

Please follow these steps:

### 1. Fork the Repository

Create your own fork of the project.

### 2. Clone the Repository

```bash
git clone https://github.com/AnkitSharma5304/smart-employee-service-desk.git
cd smart-employee-service-desk
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/AmazingFeature
```

### 4. Make Your Changes

Implement your feature or fix.

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add AmazingFeature"
```

### 6. Push Your Branch

```bash
git push origin feature/AmazingFeature
```

### 7. Open a Pull Request

Create a pull request describing your changes.

---

# 📌 Git Commit Convention

This project follows conventional commit-style messages.

Examples:

```text
feat: add ticket assignment
fix: resolve authentication issue
refactor: improve ticket controller
docs: update installation instructions
style: improve dashboard layout
chore: update dependencies
```

Using meaningful commit messages makes the project history easier to understand and maintain.

---

# 📝 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

> Make sure a `LICENSE` file containing the MIT License is present in the repository if you keep this section.

---

# 👨‍💻 Author

**Ankit Sharma**

Full-Stack MERN Developer

- GitHub: [AnkitSharma5304](https://github.com/AnkitSharma5304)
- LinkedIn: [Ankit Sharma](https://www.linkedin.com/in/ankit-sharma-67765228a/)

---

# 🙏 Acknowledgments

Special thanks to the teams and open-source communities behind the technologies used in this project:

- React team for the React framework
- Node.js team for the Node.js runtime
- Express.js team for the backend framework
- MongoDB team for the database
- Mongoose team for the MongoDB ODM
- Vite team for the frontend build tooling
- Radix UI community for accessible UI primitives
- Socket.IO team for real-time communication
- Recharts community for data visualization
- All open-source contributors whose work helped make this project possible

---

# 📞 Support

If you encounter an issue or have a question, you can contact me or open an issue in the repository.

### Email

**ankit676756@gmail.com**

### 🐛 GitHub Issues

When opening an issue, please provide:

- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Relevant error messages
- Screenshots, if applicable

---

# ⭐ Show Your Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

# 📌 Project Summary

**Smart Employee Service Desk** is a full-stack MERN application designed to streamline employee support operations through ticket management, agent assignment, real-time communication, automation, and analytics.

```text
                 ┌───────────────────────┐
                 │        Users          │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │    Create Tickets     │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │  Department & Routing │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │    Agent Assignment   │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   Status & Priority   │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │  Resolution & Closure │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Analytics & Reporting │
                 └───────────────────────┘
```

---

# 🚀 Built With

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Tailwind CSS
- Vite

---

**A scalable support management platform for modern organizations.**