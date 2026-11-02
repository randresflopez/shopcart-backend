// Archivo: src/services/catalogoService.ts
import { connectDB, sql } from '../config/database';

export class CatalogoService {

    // 1. Obtener todas las categorías activas
    static async obtenerCategorias() {
        const pool = await connectDB();
        const resultado = await pool.request()
            .query(`
                SELECT IDCategoria, Nombre, Descripcion, ImagenURL 
                FROM dbo.Categoria 
                WHERE Activo = 1 
                ORDER BY Nombre ASC
            `);
        return resultado.recordset;
    }

    // 2. Obtener productos activos (opcionalmente filtrados por categoría)
    static async obtenerProductos(idCategoria?: number) {
        const pool = await connectDB();
        const request = pool.request();

        let query = `
            SELECT p.IDProducto, p.IDCategoria, c.Nombre AS CategoriaNombre, 
                   p.Nombre, p.Descripcion, p.PrecioBase, p.Activo
            FROM dbo.Producto p
            INNER JOIN dbo.Categoria c ON p.IDCategoria = c.IDCategoria
            WHERE p.Activo = 1
        `;

        if (idCategoria) {
            query += ` AND p.IDCategoria = @idCategoria`;
            request.input('idCategoria', sql.Int, idCategoria);
        }

        query += ` ORDER BY p.Nombre ASC`;

        const resultado = await request.query(query);
        return resultado.recordset;
    }

    // 3. Obtener el detalle de un producto específico con sus variantes y stock
    static async obtenerDetalleProducto(idProducto: number) {
        const pool = await connectDB();

        // Consultar el producto
        const productoRes = await pool.request()
            .input('idProducto', sql.Int, idProducto)
            .query(`
                SELECT p.IDProducto, p.IDCategoria, c.Nombre AS CategoriaNombre, 
                       p.Nombre, p.Descripcion, p.PrecioBase
                FROM dbo.Producto p
                INNER JOIN dbo.Categoria c ON p.IDCategoria = c.IDCategoria
                WHERE p.IDProducto = @idProducto AND p.Activo = 1
            `);

        if (productoRes.recordset.length === 0) {
            return null;
        }

        const producto = productoRes.recordset[0];

        // Consultar sus variantes activas y el stock actual
        const variantesRes = await pool.request()
            .input('idProducto', sql.Int, idProducto)
            .query(`
                SELECT IDVariante, SKU, NombreVariante, Precio, StockActual
                FROM dbo.VarianteProducto
                WHERE IDProducto = @idProducto AND Activo = 1
            `);

        producto.variantes = variantesRes.recordset;
        return producto;
    }
}