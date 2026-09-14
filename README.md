# Casalia

## Requisitos previos

- [.NET SDK](https://dotnet.microsoft.com/download) 10 (LTS)
- [Node.js](https://nodejs.org/) (18+) y npm

## 1. Levantar el backend

Desde la raíz del proyecto:

\```powershell
cd backend/MiniRoomApi
dotnet restore
dotnet run
\```

Si todo salió bien, deberías ver algo como:

\```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
\```

Podés confirmar que está vivo abriendo [http://localhost:5000](http://localhost:5000) en el navegador — debería mostrar:

> MiniRoomApi corriendo. Hub de chat en /hubs/room

El hub de SignalR queda expuesto en `http://localhost:5000/hubs/room`.

**Dejá esta terminal corriendo.**

## 2. Levantar el frontend

En una **terminal nueva**:

\```powershell
cd frontend
npm install
npm install @microsoft/signalr
npm run dev
\```

Vite va a levantar el front en:

\```
➜  Local:   http://localhost:5173/
\```

Abrí esa URL en el navegador.
