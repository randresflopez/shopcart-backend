import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: sql.config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'ShopCartDB',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    options: {
        encrypt: false, // Cambiar a true si usas Azure
        trustServerCertificate: true // Necesario para conexiones locales en desarrollo
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let poolConnection: sql.ConnectionPool | null = null;

export const connectDB = async (): Promise<sql.ConnectionPool> => {
    try {
        if (poolConnection) {
            return poolConnection;
        }
        poolConnection = await sql.connect(dbConfig);
        console.log('¡Conexión exitosa a Microsoft SQL Server!');
        return poolConnection;
    } catch (error) {
        console.error('Error al conectar a la Base de Datos:', error);
        throw error;
    }
};

export { sql };