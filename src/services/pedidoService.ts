// Archivo: src/services/pedidoService.ts
import { connectDB, sql } from '../config/database';

export class PedidoService {
    static async crearPedido(
        idUsuario: number,
        idDireccion: number,
        detalles: { IDVariante: number; Cantidad: number }[],
        claveIdempotencia?: string,
        idCupon?: number
    ) {
        const pool = await connectDB();
        
        const detallesJson = JSON.stringify(detalles);

        const result = await pool.request()
            .input('p_IDUsuario', sql.Int, idUsuario)
            .input('p_IDDireccion', sql.Int, idDireccion)
            .input('p_IDCupon', sql.Int, idCupon || null)
            .input('p_ClaveIdempotencia', sql.VarChar(100), claveIdempotencia || null)
            .input('p_DetallesJson', sql.NVarChar(sql.MAX), detallesJson)
            .execute('SP_Pedido_CrearPedido');

        return result.recordset[0];
    }
}