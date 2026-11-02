// Archivo: src/services/inventarioService.ts
import { connectDB, sql } from '../config/database';

export class InventarioService {
    static async registrarMovimiento(
        idVariante: number,
        idUsuario: number,
        idMotivoKardex: number,
        cantidad: number,
        observacion?: string,
        idReferencia?: number
    ) {
        const pool = await connectDB();

        const result = await pool.request()
            .input('p_IDVariante', sql.Int, idVariante)
            .input('p_IDUsuario', sql.Int, idUsuario)
            .input('p_IDMotivoKardex', sql.Int, idMotivoKardex)
            .input('p_Cantidad', sql.Int, cantidad)
            .input('p_Observacion', sql.VarChar(255), observacion || null)
            .input('p_IDReferencia', sql.Int, idReferencia || null)
            .execute('SP_Inventario_RegistrarMovimiento');

        return result.recordset[0];
    }
}