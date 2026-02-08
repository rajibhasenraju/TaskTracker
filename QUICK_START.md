# TaskTracker - Quick Start Guide

Get TaskTracker running locally in just a few steps!

## Option 1: Docker Compose (Recommended)

The fastest way to get started is with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/rajibhasenraju/TaskTracker.git
cd TaskTracker

# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
```

## Option 2: Manual Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Step 1: Database Setup

Create a PostgreSQL database:
```bash
createdb tasktracker
```

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

The backend will start on http://localhost:3001

### Step 3: Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (defaults are fine for local development)
npm run dev
```

The frontend will start on http://localhost:5173

## First Steps

1. **Open your browser** to http://localhost:5173

2. **Register a new organization**:
   - Organization Name: Your Company
   - Subdomain: yourcompany (must be unique)
   - Your Name: Your Name
   - Email: you@example.com
   - Password: (choose a secure password)

3. **Start creating tasks**:
   - Click the "New Task" button
   - Fill in the task details
   - Tasks will appear on the Kanban board

4. **Manage tasks**:
   - Drag tasks between columns (To Do, In Progress, Done)
   - Click edit to modify task details
   - Click delete to remove tasks
   - View statistics at the top of the dashboard

## Default Configuration

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost:5432/tasktracker
JWT_SECRET=your-secret-key-change-in-production
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check your DATABASE_URL in backend/.env
- Verify the database exists: `psql -l`

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: The dev server will prompt you to use a different port

### Rate Limiting
If you're testing and hit rate limits:
- Auth endpoints: 5 requests per 15 minutes
- API endpoints: 100 requests per 15 minutes
- Wait 15 minutes or restart the backend

## Production Deployment

For production deployment:

1. **Build the applications**:
   ```bash
   cd backend && npm run build
   cd frontend && npm run build
   ```

2. **Set production environment variables**:
   - Use a strong JWT_SECRET
   - Configure production DATABASE_URL
   - Set NODE_ENV=production

3. **Deploy**:
   - Backend: Deploy the `dist` folder
   - Frontend: Deploy the `dist` folder to a static host

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- See [IMPLEMENTATION.md](IMPLEMENTATION.md) for architecture details
- Review [SCREENSHOTS.md](SCREENSHOTS.md) for UI features

## Demo Data

To load demo data (optional):

```bash
psql tasktracker < backend/seed-demo.sql
```

This creates a demo organization with sample tasks.

---

**Enjoy using TaskTracker!** 🚀
