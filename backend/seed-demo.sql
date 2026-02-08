-- Demo seed data for TaskTracker
-- This script creates a demo tenant, user, and some sample tasks

-- Note: Run this after the application has initialized the database

-- Insert demo tenant
INSERT INTO tenants (name, subdomain) 
VALUES ('Demo Company', 'demo')
ON CONFLICT (subdomain) DO NOTHING;

-- Get the tenant ID
-- Insert demo user (password: demo123)
-- Password hash for "demo123" using bcrypt
INSERT INTO users (tenant_id, email, password, name, role)
SELECT id, 'demo@demo.com', '$2a$10$YourHashedPasswordHere', 'Demo User', 'admin'
FROM tenants WHERE subdomain = 'demo'
ON CONFLICT (tenant_id, email) DO NOTHING;

-- Insert sample tasks
-- Note: Replace created_by with actual user id after user creation
INSERT INTO tasks (tenant_id, title, description, status, priority, created_by)
SELECT 
  t.id,
  'Design new homepage',
  'Create mockups and wireframes for the new company homepage',
  'in-progress',
  'high',
  u.id
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';

INSERT INTO tasks (tenant_id, title, description, status, priority, created_by, due_date)
SELECT 
  t.id,
  'Update documentation',
  'Review and update all API documentation',
  'todo',
  'medium',
  u.id,
  CURRENT_DATE + INTERVAL '7 days'
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';

INSERT INTO tasks (tenant_id, title, description, status, priority, created_by)
SELECT 
  t.id,
  'Fix login bug',
  'Users report intermittent login failures',
  'todo',
  'high',
  u.id
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';

INSERT INTO tasks (tenant_id, title, description, status, priority, created_by)
SELECT 
  t.id,
  'Deploy to production',
  'Deploy the latest version to production environment',
  'done',
  'high',
  u.id
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';

INSERT INTO tasks (tenant_id, title, description, status, priority, created_by, due_date)
SELECT 
  t.id,
  'Code review',
  'Review pull requests from the team',
  'in-progress',
  'medium',
  u.id,
  CURRENT_DATE + INTERVAL '2 days'
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';

INSERT INTO tasks (tenant_id, title, description, status, priority, created_by)
SELECT 
  t.id,
  'Team meeting',
  'Weekly sync with the development team',
  'done',
  'low',
  u.id
FROM tenants t
JOIN users u ON u.tenant_id = t.id
WHERE t.subdomain = 'demo' AND u.email = 'demo@demo.com';
