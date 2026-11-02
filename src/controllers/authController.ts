// Archivo: src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    
    static async registrar(req: Request, res: Response) {
        try {
            const { Nombre, Correo, Password, Telefono } = req.body;

            if (!Nombre || !Correo || !Password) {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'Faltan campos obligatorios (nombre, correo, password).'
                });
            }

            const nuevoUsuario = await AuthService.registrar(Nombre, Correo, Password, Telefono);

            return res.status(201).json({
                exito: true,
                mensaje: 'Usuario registrado exitosamente.',
                datos: nuevoUsuario
            });

        } catch (error: any) {
            console.error('Error en registro:', error);
            return res.status(400).json({
                exito: false,
                mensaje: error.message || 'Error al registrar el usuario.'
            });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { Correo, Password } = req.body;

            if (!Correo || !Password) {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'Debe proporcionar correo y contraseña.'
                });
            }

            const resultado = await AuthService.login(Correo, Password);

            return res.status(200).json({
                exito: true,
                mensaje: 'Inicio de sesión exitoso.',
                datos: resultado
            });

        } catch (error: any) {
            console.error('Error en login:', error);
            return res.status(401).json({
                exito: false,
                mensaje: error.message || 'Error al iniciar sesión.'
            });
        }
    }
}