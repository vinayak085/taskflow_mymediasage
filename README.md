# Mini Project Management System

A full-stack project management application built with Node.js (Express) backend and React frontend. Manage projects and tasks with features like pagination, filtering, sorting, and input validation.

## 🚀 Features

### Backend
- **RESTful APIs** for managing projects and tasks
- **MongoDB** database integration
- **Pagination** support for projects
- **Filtering** tasks by status (todo/in-progress/done)
- **Sorting** tasks by due date
- **Input validation** and proper error handling
- **CORS** enabled for frontend integration

### Frontend
- **React** with Vite for fast development
- **Mobile responsive** design (works on phones, tablets, and desktops)
- **Real-time updates** with hot module replacement
- **Loading states** and error handling
- **User-friendly UI** with Tailwind CSS
- **Form validation** with error messages

## 📋 API Endpoints

### Project APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects?page=1&limit=10` | Get all projects (with pagination) |
| GET | `/api/projects/:id` | Get project by ID |
| DELETE | `/api/projects/:id` | Delete a project |

### Task APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/:project_id/tasks` | Create a new task |
| GET | `/api/projects/:project_id/tasks?status=&sort=` | Get tasks (with filtering & sorting) |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Dotenv

**Frontend:**
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Open the `.env` file in the backend directory
   - Update the MongoDB connection string:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini_project_db
   ```

4. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or next available port)

## 🎯 Usage

### Creating a Project
1. Open the application in your browser
2. Use the "Create Project" form on the home page
3. Enter project name (required) and description (optional)
4. Click "Add Project"

### Managing Tasks
1. Click on a project card to view details
2. Use the "Create Task" form to add tasks
3. Fill in:
   - Title (required)
   - Description (optional)
   - Priority (low/medium/high)
   - Due date (optional)
4. Filter tasks by status using the dropdown
5. Sort tasks by due date
6. Update task status using the status dropdown
7. Delete tasks using the ✕ button

### Pagination
- Navigate through projects using Previous/Next buttons
- Default: 10 projects per page

## 📁 Project Structure

```
mini-project/
├── backend/
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   ├── utils/
│   │   └── db.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ProjectForm.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskForm.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── ProjectDetails.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🗄️ Database Schema

### Project Model
```javascript
{
  name: String (required),
  description: String,
  created_at: Date (auto-generated)
}
```

### Task Model
```javascript
{
  project_id: ObjectId (ref: Project, required),
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in-progress', 'done'], default: 'todo'),
  priority: String (enum: ['low', 'medium', 'high'], required),
  due_date: Date,
  created_at: Date (auto-generated)
}
```

## 🔧 API Examples

### Create Project
```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Project description"}'
```

### Get Projects with Pagination
```bash
curl http://localhost:8000/api/projects?page=1&limit=10
```

### Create Task
```bash
curl -X POST http://localhost:8000/api/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Task Title",
    "description":"Task description",
    "status":"todo",
    "priority":"high",
    "due_date":"2026-12-31"
  }'
```

### Get Tasks with Filtering & Sorting
```bash
# Filter by status
curl http://localhost:8000/api/projects/PROJECT_ID/tasks?status=todo

# Sort by due date
curl http://localhost:8000/api/projects/PROJECT_ID/tasks?sort=due_date

# Filter and sort
curl http://localhost:8000/api/projects/PROJECT_ID/tasks?status=in-progress&sort=due_date
```

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Color-coded Badges**: 
  - Priority: Red (high), Yellow (medium), Green (low)
  - Status: Gray (todo), Blue (in-progress), Green (done)
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: For delete operations
- **Sticky Navigation**: Navbar stays visible while scrolling

## 🔒 Error Handling

- Input validation on both frontend and backend
- Proper HTTP status codes (400, 404, 500)
- CORS configured for cross-origin requests
- Global error interceptor for API calls
- Try-catch blocks in all async operations

## 📱 Mobile Responsive Breakpoints

- **Mobile**: < 640px (1 column layout)
- **Tablet**: ≥ 640px (2 column layout)
- **Desktop**: ≥ 1024px (3 column layout)

## 🚀 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build artifacts will be stored in the `frontend/dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a mini project management system with modern web technologies.

## 🐛 Known Issues

- None reported

## 🔄 Future Enhancements

- [ ] User authentication and authorization
- [ ] Task assignment to users
- [ ] Email notifications for due dates
- [ ] File attachments for tasks
- [ ] Project collaboration features
- [ ] Dark mode support
- [ ] Export projects/tasks to CSV
- [ ] Search functionality
- [ ] Task comments and activity log

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy Project Managing! 🚀**
