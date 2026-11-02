// Archivo: src/routes/catalogoRoutes.ts
import { Router } from 'express';
import { CatalogoController } from '../controllers/catalogoController';

const router = Router();

// Endpoints públicos de lectura
router.get('/categorias', CatalogoController.listarCategorias);
router.get('/productos', CatalogoController.listarProductos);
router.get('/productos/:id', CatalogoController.obtenerProductoPorId);

export default router;