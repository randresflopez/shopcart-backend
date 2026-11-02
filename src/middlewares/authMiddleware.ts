// Archivo: src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_por_defecto';

// Extender la interfaz Request de Express para que reconozca el usuario decodificado
export interface AuthRequest extends Request {
    usuario?: {
        idUsuario: number;
        correo: string;
    };
}

export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    // El token suele venir en el formato: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            exito: false,
            mensaje: 'Acceso denegado. No se proporcionó un token de autenticación.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { idUsuario: number; correo: string };
        req.usuario = decoded; // Guardamos los datos del usuario en la petición
        next(); // Continuar con la ejecución del controlador
    } catch (error) {
        return res.status(403).json({
            exito: false,
            mensaje: 'Token inválido o expirado.'
        });
    }
};