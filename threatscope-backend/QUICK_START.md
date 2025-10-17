# 🚀 ThreatScope Backend - Guía de Inicio Rápido

## ✅ Backend Completado

Se ha implementado un backend completo con NestJS que incluye:

### Módulos Implementados

- ✅ **Auth** - Autenticación JWT con registro y login
- ✅ **Users** - Gestión completa de usuarios
- ✅ **Threats** - Gestión de amenazas cibernéticas
- ✅ **Sources** - Gestión de fuentes de inteligencia
- ✅ **Alerts** - Sistema de alertas
- ✅ **Stats** - Estadísticas y métricas del dashboard

### Características

- ✅ TypeORM con PostgreSQL
- ✅ Validación de datos con class-validator
- ✅ Autenticación JWT con Passport
- ✅ CORS habilitado
- ✅ Hash de contraseñas con bcrypt
- ✅ DTOs para todas las operaciones
- ✅ Relaciones entre entidades
- ✅ Filtros y búsquedas

## 📋 Pasos para Ejecutar

### 1. Asegúrate de tener PostgreSQL corriendo

```powershell
# Verifica que PostgreSQL esté corriendo
# Por defecto usa la configuración de tu .env:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASS=Islu2003.@
# DB_NAME=threatscope
```

### 2. La base de datos se creará automáticamente

El backend creará automáticamente todas las tablas al iniciar gracias a TypeORM `synchronize: true` en desarrollo.

### 3. Inicia el servidor

```powershell
cd C:\Users\Israel\Desktop\Desarrollo\ThreatScope\threatscope-backend
pnpm run start:dev
```

El servidor estará disponible en: **<http://localhost:3000/api>**

### 4. (Opcional) Poblar la base de datos con datos de prueba

```powershell
pnpm run seed
```

Esto creará:

- 2 usuarios de prueba (admin y analyst)
- 3 fuentes de inteligencia
- 4 amenazas de ejemplo
- 4 alertas de prueba

**Credenciales de prueba:**

- Admin: `admin@threatscope.com` / `Admin123!`
- Analyst: `analyst@threatscope.com` / `Analyst123!`

## 🧪 Probar la API

### 1. Registrar un usuario

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "username": "testuser",
  "password": "Test123!",
  "firstName": "Test",
  "lastName": "User",
  "role": "analyst"
}
```

### 2. Login

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!"
}
```

Respuesta:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "username": "testuser",
    "role": "analyst"
  }
}
```

### 3. Obtener estadísticas del dashboard

```bash
GET http://localhost:3000/api/stats/dashboard
```

### 4. Obtener amenazas

```bash
GET http://localhost:3000/api/threats
GET http://localhost:3000/api/threats?type=ransomware
GET http://localhost:3000/api/threats?severity=critical
GET http://localhost:3000/api/threats?search=phishing
```

### 5. Obtener alertas pendientes

```bash
GET http://localhost:3000/api/alerts/pending
```

## 📁 Estructura del Código

```text
src/
├── main.ts                    # Configuración principal (CORS, validación, etc)
├── app.module.ts              # Módulo raíz con todos los imports
├── comunes/
│   └── guards/
│       └── jwt-auth.guard.ts  # Guard de autenticación JWT
└── modulos/
    ├── auth/                  # Módulo de autenticación
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── auth.module.ts
    │   ├── jwt.strategy.ts
    │   └── dto/
    │       └── login.dto.ts
    ├── users/                 # Módulo de usuarios
    │   ├── users.controller.ts
    │   ├── users.service.ts
    │   ├── users.module.ts
    │   ├── entities/
    │   │   └── user.entity.ts
    │   └── dto/
    │       ├── create-user.dto.ts
    │       └── update-user.dto.ts
    ├── threats/               # Módulo de amenazas
    ├── sources/               # Módulo de fuentes
    ├── alerts/                # Módulo de alertas
    └── stats/                 # Módulo de estadísticas
```

## 🔧 Próximos Pasos

1. **Conectar el Frontend de Next.js**
   - El backend ya tiene CORS configurado
   - Usa `http://localhost:3000/api` como base URL
   - Guarda el JWT token en localStorage o cookies

2. **Agregar Guards a los endpoints**
   - Importa `JwtAuthGuard` en los controladores
   - Usa `@UseGuards(JwtAuthGuard)` en los endpoints protegidos

3. **Implementar lógica adicional**
   - Agregar más filtros y búsquedas
   - Implementar paginación
   - Agregar webhooks para alertas en tiempo real
   - Integrar con fuentes de inteligencia reales

## 📚 Documentación Completa

Ver `API_DOCUMENTATION.md` para la documentación completa de todos los endpoints.

## ❗ Troubleshooting

### Error: "Cannot connect to database"

- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `.env`
- Asegúrate de que el usuario tenga permisos

### Error: "Port 3000 already in use"

- Cambia el puerto en `.env`: `PORT=3001`
- O detén el proceso que está usando el puerto 3000

### Error de compilación

- Ejecuta `pnpm install` de nuevo
- Verifica que todas las dependencias estén instaladas
- Revisa los errores de TypeScript
