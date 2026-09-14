# Casalia

React/Vite con escenas 3D, ASP.NET Core 10, SignalR y PostgreSQL.

## Railway

El Dockerfile de la raíz compila frontend y backend en un solo servicio web. PostgreSQL se crea como servicio separado. Seguí [la guía de Railway](docs/RAILWAY.md) para configurar el deploy.

## Desarrollo local

Requisitos: .NET SDK 10, Node.js 22, npm y Docker Desktop.
Copiá `.env.example` a `.env` y elegí una contraseña local.

```powershell
docker compose up -d
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=casalia;Username=casalia;Password=TU_PASSWORD_LOCAL"
dotnet run --project backend/Casalia.Api --launch-profile http
```

En otra terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Abrí http://localhost:5173. Vite redirige `/api` y `/hubs` al backend en el puerto 5062, incluidos los WebSockets.

## Probar el contenedor completo

Con Docker Desktop activo y `.env` configurado:

```powershell
docker compose -f docker-compose.yml -f docker-compose.deploy.yml up --build -d
```

Abrí http://localhost:8080. `/health` verifica el servidor y `/api/db-check` comprueba PostgreSQL.
