# TaskTracker UI Screenshots

## Login Page
The login page allows users to authenticate with their organization's subdomain, email, and password.

![Login Page - Clean authentication interface](docs/images/login-page.png)

## Registration Page
New organizations can register with their company name, subdomain, and admin user details.

![Registration Page - Easy onboarding](docs/images/register-page.png)

## Dashboard - Task Board View
The main dashboard features a Kanban-style board with three columns (To Do, In Progress, Done) for visual task management.

![Dashboard - Kanban Board](docs/images/dashboard.png)

### Features Shown:
- **Stats Cards**: Display total tasks and counts by status (To Do, In Progress, Done)
- **Task Cards**: Show task title, description, priority badge, due date
- **Quick Actions**: Edit and delete buttons on each task card
- **Status Dropdown**: Change task status directly from the card
- **Priority Indicators**: Color-coded badges (Low=Green, Medium=Yellow, High=Red)

## Task Creation Modal
Create new tasks with a clean, intuitive modal interface.

![Task Creation Modal](docs/images/create-task-modal.png)

### Task Fields:
- Title (required)
- Description
- Status (To Do, In Progress, Done)
- Priority (Low, Medium, High)
- Due Date

## UI Features

### Multi-Tenant Architecture
- Complete data isolation per organization
- Subdomain-based tenant identification
- User authentication scoped to tenant

### Modern Design
- Built with Tailwind CSS
- Responsive design (mobile, tablet, desktop)
- Clean, professional interface
- Intuitive navigation

### Task Management
- Kanban board view
- Drag-and-drop-style status updates
- Priority color coding
- Due date tracking
- Task statistics dashboard

## Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Vite for fast builds

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL with multi-tenant schema
- JWT authentication
- bcrypt password hashing

## Getting Started

See the main [README.md](../README.md) for installation and setup instructions.
