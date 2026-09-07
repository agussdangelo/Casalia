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

var app = builder.Build();

app.UseCors("DevFrontend");

// Endpoint de prueba, para confirmar que el backend está vivo
app.MapGet("/", () => "MiniRoomApi corriendo. Hub de chat en /hubs/room");

// Acá se "engancha" el Hub de SignalR a una ruta
app.MapHub<RoomHub>("/hubs/room");

app.Run();
