import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

// All user routes require authentication and tenant context
router.use(apiLimiter, authMiddleware, tenantMiddleware);

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

export default router;
