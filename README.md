# ShopCart Backend - Fase 1

Backend profesional desarrollado para el sistema de comercio electrónico ShopCart, implementando una arquitectura robusta por capas bajo los estándares de la industria.

##  Stack Tecnológico
* **Runtime:** Node.js (v25+)
* **Lenguaje:** TypeScript (Modo estricto)
* **Framework:** Express
* **Base de Datos:** SQL Server (`mssql`) con Stored Procedures transaccionales
* **Seguridad:** JSON Web Tokens (JWT), `bcryptjs` para encriptación y variables de entorno (`dotenv`).

##  Estructura del Proyecto
```text
src/
├── config/        # Configuración de base de datos y variables de entorno
├── controllers/   # Controladores HTTP y validaciones de entrada
├── middlewares/   # Middlewares de seguridad (Verificación de JWT)
├── routes/        # Definición de endpoints de la API
└── services/      # Lógica de negocio y llamadas a Procedimientos Almacenados