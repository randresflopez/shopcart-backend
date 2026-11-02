import { Router } from 'express';
import { PedidoController } from '../controllers/pedidoController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

// Ruta protegida: Exige token válido en los headers
router.post('/', verificarToken, PedidoController.crear);

export default router;