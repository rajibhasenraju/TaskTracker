import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';

const router = Router();

// All user routes require authentication and tenant context
router.use(authMiddleware, tenantMiddleware);

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

export default router;
