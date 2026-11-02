// Archivo: src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// Endpoints públicos
router.post('/register', AuthController.registrar);
router.post('/login', AuthController.login);

export default router;