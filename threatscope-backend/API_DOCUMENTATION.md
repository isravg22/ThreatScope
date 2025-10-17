# ThreatScope Backend - API Documentation

## 🚀 Descripción

Backend de ThreatScope - Portal de Inteligencia de Ciberamenazas construido con NestJS, PostgreSQL y TypeORM.

## 📋 Características

- ✅ Autenticación JWT
- ✅ CRUD completo para Usuarios, Amenazas, Fuentes y Alertas
- ✅ Estadísticas y métricas en tiempo real
- ✅ Validación de datos con class-validator
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ CORS habilitado
- ✅ Variables de entorno con dotenv

## 🛠️ Tecnologías

- **NestJS** - Framework backend
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Passport** - Estrategias de autenticación
- **bcrypt** - Hash de contraseñas
- **class-validator** - Validación de DTOs

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Ya tienes el archivo .env configurado con:
# - DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
# - JWT_SECRET
# - PORT

# Crear la base de datos en PostgreSQL
createdb threatscope
```

## 🚀 Ejecución

```bash
# Desarrollo
pnpm run start:dev

# Producción
pnpm run build
pnpm run start:prod
```

El servidor estará corriendo en: `http://localhost:3000/api`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Users

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Threats (Amenazas)

- `GET /api/threats` - Obtener todas las amenazas (filtros: type, severity, status, search)
- `GET /api/threats/:id` - Obtener amenaza por ID
- `GET /api/threats/stats/by-type` - Estadísticas por tipo
- `GET /api/threats/stats/by-severity` - Estadísticas por severidad
- `GET /api/threats/recent` - Amenazas recientes
- `POST /api/threats` - Crear amenaza
- `PATCH /api/threats/:id` - Actualizar amenaza
- `DELETE /api/threats/:id` - Eliminar amenaza

### Sources (Fuentes)

- `GET /api/sources` - Obtener todas las fuentes
- `GET /api/sources/:id` - Obtener fuente por ID
- `GET /api/sources/active` - Obtener fuentes activas
- `POST /api/sources` - Crear fuente
- `POST /api/sources/:id/sync` - Sincronizar fuente
- `PATCH /api/sources/:id` - Actualizar fuente
- `DELETE /api/sources/:id` - Eliminar fuente

### Alerts (Alertas)

- `GET /api/alerts` - Obtener todas las alertas (filtros: status, priority)
- `GET /api/alerts/:id` - Obtener alerta por ID
- `GET /api/alerts/pending` - Obtener alertas pendientes
- `POST /api/alerts` - Crear alerta
- `POST /api/alerts/:id/acknowledge` - Reconocer alerta
- `POST /api/alerts/:id/resolve` - Resolver alerta
- `PATCH /api/alerts/:id` - Actualizar alerta
- `DELETE /api/alerts/:id` - Eliminar alerta

### Stats (Estadísticas)

- `GET /api/stats/dashboard` - Estadísticas generales del dashboard
- `GET /api/stats/threats/by-type` - Amenazas agrupadas por tipo
- `GET /api/stats/threats/by-severity` - Amenazas agrupadas por severidad
- `GET /api/stats/threats/by-source` - Amenazas agrupadas por fuente
- `GET /api/stats/alerts/by-priority` - Alertas agrupadas por prioridad
- `GET /api/stats/alerts/by-status` - Alertas agrupadas por estado
- `GET /api/stats/recent-activity` - Actividad reciente

## 📊 Modelos de Datos

### User

```typescript
{
  id: string (UUID)
  email: string (unique)
  username: string
  password: string (hashed)
  firstName?: string
  lastName?: string
  role: 'admin' | 'analyst' | 'viewer'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Threat

```typescript
{
  id: string (UUID)
  title: string
  description: string
  type: 'malware' | 'phishing' | 'ransomware' | 'ddos' | 'data_breach' | 'zero_day' | 'apt' | 'other'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'active' | 'monitoring' | 'mitigated' | 'resolved'
  indicators?: string[]
  affectedSystems?: string[]
  cveId?: string
  mitigation?: string
  sourceId?: string
  detectedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Source

```typescript
{
  id: string (UUID)
  name: string (unique)
  description?: string
  type: 'feed' | 'api' | 'manual' | 'honeypot' | 'siem'
  url?: string
  status: 'active' | 'inactive' | 'error'
  config?: Object
  lastSync?: Date
  totalThreats: number
  createdAt: Date
  updatedAt: Date
}
```

### Alert

```typescript
{
  id: string (UUID)
  title: string
  message: string
  priority: 'critical' | 'high' | 'medium' | 'low' | 'info'
  status: 'pending' | 'acknowledged' | 'investigating' | 'resolved' | 'dismissed'
  threatId?: string
  assignedToId?: string
  acknowledgedAt?: Date
  resolvedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔒 Autenticación

Para acceder a endpoints protegidos, incluye el token JWT en el header:

```text
Authorization: Bearer <token>
```

## 🗄️ Base de Datos

Asegúrate de tener PostgreSQL instalado y corriendo. La aplicación creará automáticamente las tablas al iniciar (con `synchronize: true` en desarrollo).

## 📝 Variables de Entorno

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contraseña
DB_NAME=threatscope
JWT_SECRET=tu_jwt_secret
FRONTEND_URL=http://localhost:3001
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```
