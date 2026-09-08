using Casalia.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SignalR: el motor de tiempo real (chat, comentarios anclados, presencia, etc.)
builder.Services.AddSignalR();

// CORS abierto solo para desarrollo local (el frontend de Vite corre en otro puerto)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Base de datos: PostgreSQL vía Npgsql
builder.Services.AddDbContext<CasaliaDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

var app = builder.Build();

app.UseCors("DevFrontend");

// Endpoint de prueba, para confirmar que el backend está vivo
app.MapGet("/", () => "MiniRoomApi corriendo. Hub de chat en /hubs/room");

// Acá se "engancha" el Hub de SignalR a una ruta
app.MapHub<RoomHub>("/hubs/room");

// Test de conexión -> https://localhost:7123/api/db-check si sale conectado:true salió bien
app.MapGet("/api/db-check", async (CasaliaDbContext db) =>
{
    bool conectado = await db.Database.CanConnectAsync();
    return Results.Ok(new { conectado });
});

app.Run();
