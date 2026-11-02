// Archivo: src/routes/inventarioRoutes.ts
import { Router } from 'express';
import { InventarioController } from '../controllers/inventarioController';

const router = Router();

// Ruta POST: http://localhost:3000/api/inventario/movimiento
router.post('/movimiento', InventarioController.registrar);

export default router;