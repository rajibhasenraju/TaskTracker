import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';

const router = Router();

// All task routes require authentication and tenant context
router.use(authMiddleware, tenantMiddleware);

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/stats', TaskController.getStats);
router.get('/:id', TaskController.getTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
