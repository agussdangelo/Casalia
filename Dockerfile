FROM node:22-bookworm-slim AS frontend
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
WORKDIR /src
COPY backend/Casalia.Api/Casalia.Api.csproj Casalia.Api/
COPY backend/Casalia.Application/Casalia.Application.csproj Casalia.Application/
COPY backend/Casalia.Infrastructure/Casalia.Infrastructure.csproj Casalia.Infrastructure/
COPY backend/Casalia.Domain/Casalia.Domain.csproj Casalia.Domain/
RUN dotnet restore Casalia.Api/Casalia.Api.csproj
COPY backend/ ./
RUN dotnet publish Casalia.Api/Casalia.Api.csproj -c Release -o /app/publish --no-restore /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_HTTP_PORTS=8080
COPY --from=backend /app/publish ./
COPY --from=frontend /src/frontend/dist ./wwwroot
USER $APP_UID
EXPOSE 8080
ENTRYPOINT ["dotnet", "Casalia.Api.dll"]
