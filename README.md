# RiwiFlow - Kanban Task Management Application

> A Single Page Application (SPA) for managing tasks with a Kanban board, featuring role-based access control and real-time task updates.

## 📋 Project Overview

**RiwiFlow** is a professional task management system built with vanilla JavaScript that implements:

- ✅ **Kanban Board** - Organize tasks into 4 columns: To Do, In Progress, In Review, Done
- ✅ **Role-Based Access Control** - Admin and Coder roles with different permissions
- ✅ **Single Page Application (SPA)** - No page reloads, smooth navigation
- ✅ **REST API** - Powered by json-server
- ✅ **Responsive Design** - Built with Tailwind CSS & Material Design

---

## 🎯 Key Features

### 🔐 Authentication
- Email and password login
- Session persistence with localStorage
- Automatic logout functionality

### 👥 Role-Based Permissions

#### Admin Role
- ✅ Create new tasks
- ✅ Edit all tasks (title, description, status, assigned user)
- ✅ Delete tasks
- ✅ View all tasks

#### Coder Role
- ✅ View all tasks
- ✅ Edit only assigned tasks
- ✅ Can only change: description and status
- ❌ Cannot create or delete tasks
- ❌ Cannot change task title or assigned user

### 📊 Kanban States
- **To Do** - Initial state for new tasks
- **In Progress** - Task is being worked on
- **In Review** - Task awaiting review/approval
- **Done** - Task completed

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start JSON Server (Terminal 1)
```bash
npm start
```
Server runs on: **http://localhost:3000**

### Step 3: Start Frontend (Terminal 2)
```bash
npm run dev
```
Application accessible at: **http://localhost:8080**

---

## 📝 Demo Credentials

### Admin Account
```
Email: admin@riwiflow.com
Password: admin123
Role: Admin
```

### Coder Accounts
```
Email: john@riwiflow.com
Password: coder123
Role: Coder

Email: jane@riwiflow.com
Password: coder123
Role: Coder
```

---

## 🗂️ Project Structure

```
riwiflow/
├── index.html          # Main SPA entry point
├── db.json             # JSON Server database
├── package.json        # Dependencies & scripts
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── js/
    └── app.js          # Application logic
        ├── Router              # SPA routing
        ├── Authentication      # Login/logout
        ├── Data Management     # Task CRUD
        ├── Views               # Login & Dashboard
        └── Notifications       # Error/success alerts
```

---

## 🔄 API Endpoints

### Users
```
GET    /users              # Fetch all users
```

### Tasks
```
GET    /tasks              # Fetch all tasks
GET    /tasks/:id          # Fetch single task
POST   /tasks              # Create new task
PATCH  /tasks/:id          # Update task
DELETE /tasks/:id          # Delete task
```

---

## 💾 Database Schema

### users
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@riwiflow.com",
  "password": "admin123",
  "role": "admin"
}
```

### tasks
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "status": "todo",
  "userId": 2
}
```

**Task Status Values**: `todo` | `in_progress` | `in_review` | `done`

---

## 🎨 Features Implementation

### Login Flow
1. User enters email and password
2. System validates credentials against `/users` endpoint
3. On success: User session stored in localStorage
4. On failure: Error message displayed
5. Redirects to dashboard

### Dashboard
1. Displays all tasks organized in Kanban columns
2. Shows task count per column
3. Color-coded by role and status
4. Smooth animations on hover

### Task Management
- **Admin**: Click any card to edit/delete
- **Coder**: Click assigned cards to update status/description

### State Management
- Session persisted in localStorage
- All tasks fetched from json-server
- Real-time UI updates after operations

---

## 🔒 Security Notes

⚠️ **Warning**: This is a demo application. For production:
- Never store passwords in plain text
- Implement proper JWT authentication
- Use HTTPS for all communications
- Add rate limiting on API calls
- Implement proper access control on backend

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Structure |
| **Tailwind CSS** | Styling & Layout |
| **Vanilla JavaScript** | Application Logic |
| **JSON Server** | REST API & Database |
| **Material Symbols** | Icons |
| **LocalStorage** | Session Management |

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🐛 Troubleshooting

### Issue: Cannot connect to API
**Solution**: Ensure json-server is running on port 3000
```bash
npm start
```

### Issue: Tasks not loading
**Solution**: Check browser console for errors, ensure db.json exists

### Issue: Login not working
**Solution**: Verify credentials match db.json, check API is responding

### Issue: CORS errors
**Solution**: json-server should handle CORS automatically

---

## 📚 Educational Value

This project demonstrates:
- ✅ SPA architecture and client-side routing
- ✅ REST API consumption with Fetch API
- ✅ Role-based access control patterns
- ✅ State management without frameworks
- ✅ Form handling and validation
- ✅ Error handling and user feedback
- ✅ Responsive design with Tailwind CSS
- ✅ DOM manipulation and event handling

---

## 📄 License

ISC

---

## 👤 Author

Developed by: hecarde2

---

## 📞 Support

For issues or questions, please check:
1. Browser console for error messages
2. Ensure both servers are running
3. Verify database format in db.json
4. Check API response in Network tab

---

**Happy task managing with RiwiFlow!** 🚀
