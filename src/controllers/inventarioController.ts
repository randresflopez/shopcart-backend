// Archivo: src/controllers/inventarioController.ts
import { Request, Response } from 'express';
import { InventarioService } from '../services/inventarioService';

export class InventarioController {
    static async registrar(req: Request, res: Response) {
        try {
            const { idVariante, idUsuario, idMotivoKardex, cantidad, observacion, idReferencia } = req.body;

            // Validación de campos requeridos
            if (!idVariante || !idUsuario || !idMotivoKardex || cantidad === undefined) {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'Faltan datos obligatorios (idVariante, idUsuario, idMotivoKardex, cantidad).'
                });
            }

            const resultado = await InventarioService.registrarMovimiento(
                idVariante,
                idUsuario,
                idMotivoKardex,
                cantidad,
                observacion,
                idReferencia
            );

            return res.status(201).json({
                exito: true,
                mensaje: 'Movimiento registrado en el Kardex y stock actualizado exitosamente.',
                datos: resultado
            });

        } catch (error: any) {
            console.error('Error al registrar movimiento en inventario:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Ocurrió un error al procesar el movimiento de inventario.',
                error: error.message
            });
        }
    }
}