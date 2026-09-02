# 🎫 Smart Employee Service Desk & Ticket Management

A full-stack employee service desk and ticket management portal for managing internal support requests across departments such as IT, HR, Facilities, Finance, and Access Management.

The application allows employees to create and track support tickets while support staff can manage assignments, priorities, statuses, comments, and ticket resolution.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Design](#-database-design)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [Business Rules](#-business-rules)
- [Design Decisions](#-design-decisions)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 📌 Overview

The Smart Employee Service Desk is an internal support ticket management system designed to streamline employee support requests.

Employees can submit tickets by selecting a department, category, and priority. Support staff can view, search, filter, assign, update, and resolve these tickets.

The application also provides a dashboard with ticket statistics and visual reports.

### Supported Departments

- IT
- HR
- Facilities
- Finance
- Access Management

### Ticket Priorities

- Low
- Medium
- High
- Critical

### Ticket Statuses

- Open
- In Progress
- Resolved
- Closed

---

## ✨ Features

### 🎫 Ticket Management

- Create support tickets
- View all tickets
- View ticket details
- Update tickets
- Assign tickets to support staff
- Change ticket priority
- Change ticket status
- Close tickets
- Add comments and resolution notes
- Track ticket creation and update timestamps

### 🔎 Search & Filtering

- Search tickets by title or description
- Filter by status
- Filter by priority
- Filter by department
- Filter by category
- Paginated ticket results

### 📊 Dashboard & Analytics

- Total ticket count
- Open ticket count
- In-progress ticket count
- Resolved ticket count
- Closed ticket count
- High/Critical priority tickets
- Tickets by department
- Tickets by category
- Tickets by priority
- Tickets by status
- Recent tickets

### ⏱️ Ticket Aging / SLA

The system identifies tickets that have remained open for more than 30 days.

Such tickets are marked as:

**SLA Breached / Overdue**

This helps support teams identify tickets that require attention.

### ✅ Validation & Error Handling

- Frontend form validation
- Backend request validation
- Invalid category protection
- Invalid priority/status protection
- Resource existence validation
- Centralized API error handling
- Proper HTTP status codes
- User-friendly error messages

### 📚 API Documentation

- RESTful API
- Swagger/OpenAPI documentation
- Interactive API testing through Swagger UI

---

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express.js
- Prisma ORM
- Zod
- Swagger/OpenAPI
- dotenv
- CORS

### Database

- Microsoft SQL Server
- Prisma ORM for database access and migrations

---

## 🏗️ Architecture

The application follows a simple layered architecture.

```text
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│ Dashboard / Tickets / Forms  │
└──────────────┬───────────────┘
               │
             Axios
               │
               ▼
┌──────────────────────────────┐
│       Express REST API       │
├──────────────────────────────┤
│            Routes            │
│              ↓               │
│         Controllers          │
│              ↓               │
│           Services           │
│              ↓               │
│            Prisma            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        SQL Server            │
│                              │
│ Users / Tickets / Categories │
│ Comments                     │
└──────────────────────────────┘