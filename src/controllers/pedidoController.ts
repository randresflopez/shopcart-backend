// Archivo: src/controllers/pedidoController.ts
import { Request, Response } from 'express';
import { PedidoService } from '../services/pedidoService';

export class PedidoController {
    static async crear(req: Request, res: Response) {
        try {
            // Extraemos los datos enviados desde el cuerpo de la petición (JSON)
            const { idUsuario, idDireccion, detalles, claveIdempotencia, idCupon } = req.body;

            // Validación básica de campos obligatorios
            if (!idUsuario || !idDireccion || !detalles || !Array.isArray(detalles) || detalles.length === 0) {
                return res.status(400).json({ 
                    exito: false, 
                    mensaje: 'Faltan datos obligatorios (idUsuario, idDireccion, detalles).' 
                });
            }

            // Llamamos al servicio que ejecuta el Stored Procedure en SQL Server
            const resultado = await PedidoService.crearPedido(
                idUsuario,
                idDireccion,
                detalles,
                claveIdempotencia,
                idCupon
            );

            return res.status(201).json({
                exito: true,
                mensaje: 'Pedido procesado correctamente.',
                datos: resultado
            });

        } catch (error: any) {
            console.error('Error al crear el pedido:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Ocurrió un error interno en el servidor al procesar el pedido.',
                error: error.message
            });
        }
    }
}