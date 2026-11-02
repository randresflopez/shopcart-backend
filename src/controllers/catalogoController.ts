// Archivo: src/controllers/catalogoController.ts
import { Request, Response } from 'express';
import { CatalogoService } from '../services/catalogoService';

export class CatalogoController {

    // Listar categorías
    static async listarCategorias(req: Request, res: Response) {
        try {
            const categorias = await CatalogoService.obtenerCategorias();
            return res.status(200).json({
                exito: true,
                datos: categorias
            });
        } catch (error: any) {
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al obtener las categorías.',
                error: error.message
            });
        }
    }

    // Listar productos
    static async listarProductos(req: Request, res: Response) {
        try {
            const idCategoria = req.query.idCategoria ? Number(req.query.idCategoria) : undefined;
            const productos = await CatalogoService.obtenerProductos(idCategoria);
            
            return res.status(200).json({
                exito: true,
                datos: productos
            });
        } catch (error: any) {
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al obtener los productos.',
                error: error.message
            });
        }
    }

    // Obtener detalle de un producto por ID
    static async obtenerProductoPorId(req: Request, res: Response) {
        try {
            const idProducto = Number(req.params.id);

            if (isNaN(idProducto)) {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'El ID del producto debe ser un número válido.'
                });
            }

            const producto = await CatalogoService.obtenerDetalleProducto(idProducto);

            if (!producto) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Producto no encontrado o inactivo.'
                });
            }

            return res.status(200).json({
                exito: true,
                datos: producto
            });
        } catch (error: any) {
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al consultar el detalle del producto.',
                error: error.message
            });
        }
    }
}