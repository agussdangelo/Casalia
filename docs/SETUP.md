# Setup del proyecto — Casalia

Guía para levantar el entorno local y confirmar que todo funciona (backend + base de datos).

## Requisitos previos

Antes de arrancar, asegurate de tener instalado:

- **Docker Desktop** → [docker.com](https://www.docker.com/products/docker-desktop/)
- **.NET SDK** (la misma versión que usa el proyecto)
- Un editor (Visual Studio, VS Code, Rider, lo que uses)

## Paso 1: Creá tu archivo `.env`

El `.env` real **no está en el repo**. Crealo y completá los valores

```
POSTGRES_DB=(tu_bdd)
POSTGRES_USER=(tu_usuario - suele ser postgres)
POSTGRES_PASSWORD=(tu_contraseña)
```

## Paso 3: Levantá la base de datos con Docker

Parado en la carpeta donde está el `docker-compose.yml` -> raíz del repo:

```bash
docker compose up -d
```

Esto descarga la imagen de PostgreSQL (solo la primera vez) y levanta un contenedor con la base vacía, esperando conexiones en el puerto `5432`.

**Para confirmar que quedó corriendo:**
```bash
docker compose ps
```
Tiene que aparecer el servicio `db` con status `running`/`Up`.

## Paso 4: Configurá tu `appsettings.Development.json`

Este archivo tampoco está en el repo (mismo motivo: credenciales locales). Crealo y colocá la connection string con los valores que pusiste en tu `.env`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=tpi_casalia;Username=postgres;Password=postgres"
  }
}
```

⚠️ Si estos valores no coinciden con tu `.env`, la conexión va a fallar.

## Paso 5: Restaurá los paquetes y compilá

Volvé a la raíz de `backend/` (donde está el `.sln`):

```bash
cd ..
dotnet restore
dotnet build
```

Si compila sin errores, seguís al siguiente paso.

## Paso 6: Corré el backend

```bash
dotnet run --project Casalia.Api
```

La consola te va a mostrar algo como:
```
Now listening on: https://localhost:5062
```
Anotá ese puerto, lo vas a necesitar en el paso siguiente.

## Paso 7: Probá que la conexión a la base funciona

Abrí en el navegador (reemplazando el puerto por el que te mostró tu consola):

```
https://localhost:5062/api/db-check
```

Si todo está bien configurado, deberías ver:
```json
{ "conectado": true }
```

Si te da `false` o un error, revisá en este orden:
1. ¿Está corriendo el contenedor? (`docker compose ps`)
2. ¿El `Database`, `Username` y `Password` del `appsettings.Development.json` coinciden exactamente con tu `.env`?
3. ¿El puerto es `5432`?

## Comandos útiles para el día a día

```bash
docker compose up -d       # levantar la base
docker compose stop        # apagarla (sin perder datos)
docker compose down        # apagar y borrar el contenedor (los datos quedan, gracias al volumen)
docker compose logs -f db  # ver logs de la base en vivo
dotnet run --project Casalia.Api   # correr el backend
```
