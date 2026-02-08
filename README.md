# TaskTracker - Shared Task Tracker SaaS

A modern, multi-tenant task tracking application built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

### Multi-Tenant Architecture
- **Complete tenant isolation** - Each organization has its own subdomain and isolated data
- **Secure authentication** - JWT-based authentication with bcrypt password hashing
- **Tenant-scoped data access** - All queries are automatically scoped to the authenticated user's tenant

### Modern Tracking Interface
- **Kanban Board** - Visual task board with drag-and-drop-style status updates
- **Real-time Stats** - Dashboard with task statistics by status
- **Task Management** - Create, read, update, and delete tasks with ease
- **Priority Levels** - Low, medium, and high priority tracking
- **Due Dates** - Set and track task deadlines
- **Status Tracking** - To Do, In Progress, and Done states

### User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Built with Tailwind CSS for a clean, professional look
- **Intuitive Interface** - Easy-to-use forms and interactions

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajibhasenraju/TaskTracker.git
   cd TaskTracker
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and configure your database connection
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env if needed (default: http://localhost:3001/api)
   ```

### Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE tasktracker;
```

Update the `backend/.env` file with your database credentials:
```
DATABASE_URL=postgresql://username:password@localhost:5432/tasktracker
JWT_SECRET=your-secret-key-change-in-production
PORT=3001
```

### Running the Application

1. **Start the backend** (from the backend directory)
   ```bash
   npm run dev
   ```
   The backend will run on http://localhost:3001

2. **Start the frontend** (from the frontend directory)
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

3. **Access the application**
   - Open your browser to http://localhost:5173
   - Register a new organization and user
   - Start creating and managing tasks!

## Architecture

### Multi-Tenant Design

The application uses a **shared database with tenant isolation** approach:

1. **Tenant Identification**: Each organization has a unique subdomain
2. **Data Isolation**: All tables include a `tenant_id` column
3. **Query Scoping**: Middleware ensures all queries are automatically scoped to the user's tenant
4. **Security**: Row-level security through application logic

### Database Schema

```sql
-- Tenants table
tenants (id, name, subdomain, created_at, updated_at)

-- Users table (tenant-scoped)
users (id, tenant_id, email, password, name, role, created_at, updated_at)

-- Tasks table (tenant-scoped)
tasks (id, tenant_id, title, description, status, priority, assigned_to, created_by, due_date, created_at, updated_at)
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new organization and admin user
- `POST /api/auth/login` - Login with subdomain, email, and password
- `GET /api/auth/me` - Get current user information

#### Tasks
- `GET /api/tasks` - Get all tasks for the tenant
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

#### Users
- `GET /api/users` - Get all users in the tenant
- `GET /api/users/:id` - Get a specific user

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Tenant Isolation**: Complete data separation between organizations
- **Input Validation**: Server-side validation of all inputs
- **CORS Protection**: Configured CORS for secure cross-origin requests

## Development

### Backend Development
```bash
cd backend
npm run dev  # Run with auto-reload
npm run build  # Build TypeScript
npm start  # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev  # Run development server
npm run build  # Build for production
```

## Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set environment variables on your server
3. Run: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your static hosting service
3. Configure environment variables for production API URL

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
