// Archivo: src/services/authService.ts
import { connectDB, sql } from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_por_defecto';

export class AuthService {
    
    // 1. Registro de un nuevo usuario
    static async registrar(nombre: string, correo: string, passwordPlano: string, telefono?: string) {
        const pool = await connectDB();

        // Verificar si el correo ya existe
        const usuarioExistente = await pool.request()
            .input('Correo', sql.VarChar, correo)
            .query('SELECT IDUsuario FROM dbo.Usuario WHERE Correo = @Correo');

        if (usuarioExistente.recordset.length > 0) {
            throw new Error('El correo electrónico ya se encuentra registrado.');
        }

        // Encriptar la contraseña con bcryptjs (10 rondas de salt)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordPlano, salt);

        // Insertar el nuevo usuario en la base de datos
        const resultado = await pool.request()
            .input('IDRol', sql.Int, 1)
            .input('Nombre', sql.VarChar, nombre)
            .input('Correo', sql.VarChar, correo)
            .input('PasswordHash', sql.VarChar, passwordHash)
            .input('Telefono', sql.VarChar, telefono || null)
            .query(`
                INSERT INTO dbo.Usuario (IDRol, Nombre, Correo, PasswordHash, Telefono, Activo, FechaCreacion)
                OUTPUT INSERTED.IDUsuario, INSERTED.Nombre, INSERTED.Correo, INSERTED.FechaCreacion
                VALUES (@IDRol, @Nombre, @Correo, @PasswordHash, @Telefono, 1, SYSDATETIME());
            `);

        return resultado.recordset[0];
    }

    // 2. Inicio de sesión (Login)
    static async login(correo: string, passwordPlano: string) {
        const pool = await connectDB();

        // Buscar el usuario por correo
        const resultado = await pool.request()
            .input('Correo', sql.VarChar, correo)
            .query('SELECT IDUsuario, Nombre, Correo, PasswordHash, Activo FROM dbo.Usuario WHERE Correo = @Correo');

        if (resultado.recordset.length === 0) {
            throw new Error('Credenciales inválidas.');
        }

        const usuario = resultado.recordset[0];

        if (!usuario.Activo) {
            throw new Error('La cuenta se encuentra inactiva.');
        }

        // Validar la contraseña usando bcryptjs
        const passwordValido = await bcrypt.compare(passwordPlano, usuario.PasswordHash);
        if (!passwordValido) {
            throw new Error('Credenciales inválidas.');
        }

        // Generar un token JWT con vigencia de 8 horas
        const token = jwt.sign(
            { idUsuario: usuario.IDUsuario, correo: usuario.Correo },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return {
            token,
            usuario: {
                idUsuario: usuario.IDUsuario,
                nombre: usuario.Nombre,
                correo: usuario.Correo
            }
        };
    }
}