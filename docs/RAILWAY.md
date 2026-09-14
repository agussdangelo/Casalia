# Deploy de Casalia en Railway

## Arquitectura

Un servicio Docker sirve React, los modelos 3D, la API y SignalR desde el mismo dominio. PostgreSQL corre como servicio separado conectado por red privada. Railway termina HTTPS y conecta al puerto HTTP interno asignado mediante `PORT`.

## 1. Repositorio

Subí `Dockerfile`, `.dockerignore`, `railway.json`, los cambios de backend y frontend y `frontend/package-lock.json` actualizado. El build usa `npm ci`, por lo que el lockfile debe coincidir con `frontend/package.json`.

No subas `.env`, `database.env` ni `appsettings.Development.json`. Las credenciales se cargan como variables del servicio.

## 2. Servicios

1. Creá un proyecto Railway y agregá PostgreSQL. Nombrá el servicio `Postgres` para usar las referencias siguientes.
2. Agregá un servicio desde el repositorio GitHub de Casalia y seleccioná la rama con estos archivos.
3. Dejá **Root Directory** en la raíz (`/`), no en `backend` ni en `frontend`.
4. Usá `/railway.json` como archivo de configuración si no se selecciona automáticamente. Define el builder Dockerfile y la ruta `Dockerfile`.
5. Dejá los comandos personalizados Build, Start y Pre-deploy vacíos: el Dockerfile define la compilación y el arranque.

## 3. Variables del servicio Casalia

| Variable | Valor |
| --- | --- |
| `PGHOST` | `${{Postgres.PGHOST}}` |
| `PGPORT` | `${{Postgres.PGPORT}}` |
| `PGDATABASE` | `${{Postgres.PGDATABASE}}` |
| `PGUSER` | `${{Postgres.PGUSER}}` |
| `PGPASSWORD` | `${{Postgres.PGPASSWORD}}` |

Si el servicio de base tiene otro nombre, reemplazá `Postgres` en las referencias. Usá la conexión privada, no el proxy público de PostgreSQL.

Docker ya define `ASPNETCORE_ENVIRONMENT=Production`. Railway proporciona `PORT`; el backend escucha en `0.0.0.0` en ese puerto. Fuera de Railway, el contenedor usa 8080 por defecto.

Como alternativa a las cinco variables, podés definir `ConnectionStrings__DefaultConnection` con una cadena Npgsql (`Host=...;Port=5432;Database=...;Username=...;Password=...`). Esa cadena tiene prioridad. El código no interpreta `DATABASE_URL`: usá las variables anteriores.

## 4. Deploy y dominio

Aplicá las variables y desplegá. En Networking del servicio Casalia, generá un dominio público. Si configurás un puerto de destino manualmente, debe coincidir con `PORT`.

Railway comprueba `/health` antes de activar el despliegue. Este endpoint verifica el servidor web, sin depender de PostgreSQL. La política permite hasta 10 reinicios ante un fallo del proceso.

## 5. Verificación

- Abrí el dominio y comprobá que cargan la escena y los muebles.
- `/health` debe devolver `{"status":"ok"}`.
- `/api/db-check` debe devolver `{"conectado":true}`. Si devuelve `false`, revisá las referencias `PG*` y PostgreSQL.
- Abrí dos pestañas y enviá un mensaje: debe aparecer en ambas mediante `/hubs/room`.

Usá **una sola réplica**: el hub transmite mensajes en memoria y todavía no tiene un mecanismo compartido entre instancias. El chat y los comentarios actuales no se guardan en PostgreSQL. No se ejecutan migraciones automáticamente porque el proyecto aún no define entidades ni migraciones.

## Prueba local

Copiá `.env.example` a `.env`, elegí una contraseña y arrancá Docker Desktop:

```powershell
docker compose -f docker-compose.yml -f docker-compose.deploy.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.deploy.yml logs -f app
```

Abrí http://localhost:8080. Para detener conservando el volumen de PostgreSQL:

```powershell
docker compose -f docker-compose.yml -f docker-compose.deploy.yml down
```

## Documentación oficial

- [Configuración mediante railway.json](https://docs.railway.com/config-as-code/reference)
- [Healthchecks y PORT](https://docs.railway.com/deployments/healthchecks)
