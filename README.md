# Mini demo: Diseño 3D + Chat en vivo (.NET + React + Three.js)

Este es un ejemplo mínimo para perderle el miedo al stack completo. Tiene:

- **backend/** → API en ASP.NET Core con un Hub de SignalR (chat en tiempo real).
- **frontend/** → React + React Three Fiber (Three.js) con una habitación 3D simple
  donde podés cambiar el color de la pared y ver el chat conectado al backend.

No es "el proyecto", es la prueba de concepto de las dos piezas más importantes:
**escena 3D interactiva** + **comunicación en tiempo real**.

---

## 1) Requisitos previos

Instalá esto una sola vez en tu compu:

1. **.NET 8 SDK** → https://dotnet.microsoft.com/download
2. **Node.js 18+** → https://nodejs.org
3. **VS Code** → https://code.visualstudio.com
4. Extensiones de VS Code:
   - "C# Dev Kit" (de Microsoft) → para el backend .NET
   - "ES7+ React/Redux/React-Native snippets" → opcional, comodidad para el frontend

---

## 2) Levantar el backend (.NET + SignalR)

Abrí una terminal en VS Code (Ctrl + ñ) y ejecutá:

```bash
cd backend/MiniRoomApi
dotnet restore
dotnet run
```

Te va a quedar corriendo en algo como `http://localhost:5080` (fijate el puerto exacto
que te muestra la consola). Dejalo abierto.

---

## 3) Levantar el frontend (React + Three.js)

Abrí OTRA terminal (sin cerrar la anterior):

```bash
cd frontend
npm install
npm run dev
```

Te va a dar una URL tipo `http://localhost:5173`. Abrila en el navegador.

> Importante: si el backend te quedó en un puerto distinto a 5080, actualizá la
> constante `HUB_URL` en `frontend/src/App.jsx`.

---

## 4) Qué vas a ver

- Una habitación 3D simple (piso + 3 paredes + un mueble) que podés rotar con el mouse.
- Un selector de color que cambia el color de la pared en vivo (esto es la base de
  "elegir color de pared" de tu propuesta).
- Un panel de chat a la derecha: si abrís la app en dos pestañas del navegador, los
  mensajes se ven en tiempo real en ambas — eso es SignalR haciendo lo suyo, la misma
  tecnología que usarías para el chat cliente-diseñador y los comentarios anclados.

## 5) Próximos pasos naturales desde acá

- Reemplazar las paredes/mueble (cajas simples) por modelos `.glb` reales.
- Guardar el color elegido en una base de datos (hoy vive solo en memoria del navegador).
- Agregar autenticación para diferenciar "cliente" de "diseñador".
- Anclar mensajes del chat a un objeto específico de la escena (esto es el diferencial
  central de tu propuesta, y ya tenés la base de comunicación en tiempo real armada).
