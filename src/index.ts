import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import inventarioRoutes from './routes/inventarioRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import authRoutes from './routes/authRoutes';
import catalogoRoutes from './routes/catalogoRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Registrar las rutas de la API
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/catalogo', catalogoRoutes);
app.use('/api/auth', authRoutes);
// Ruta de prueba inicial
app.get('/', (req: Request, res: Response) => {
    res.json({ mensaje: '¡Bienvenido a la API de ShopCart - Fase 1 con éxito!' });
});

// Función para arrancar el servidor
const iniciarServidor = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor debido a un fallo en la base de datos.', error);
    }
};

iniciarServidor();