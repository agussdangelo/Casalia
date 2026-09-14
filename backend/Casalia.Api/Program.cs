using Casalia.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.StaticFiles;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Railway asigna el puerto al iniciar el contenedor.
if (int.TryParse(builder.Configuration["PORT"], out var port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

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

// Configuración local mediante connection string o variables del servicio PostgreSQL.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString) &&
    !string.IsNullOrWhiteSpace(builder.Configuration["PGHOST"]))
{
    connectionString = new NpgsqlConnectionStringBuilder
    {
        Host = builder.Configuration["PGHOST"],
        Port = int.Parse(builder.Configuration["PGPORT"] ?? "5432"),
        Database = builder.Configuration["PGDATABASE"],
        Username = builder.Configuration["PGUSER"],
        Password = builder.Configuration["PGPASSWORD"]
    }.ConnectionString;
}
builder.Services.AddDbContext<CasaliaDbContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevFrontend");
}

// Vite genera wwwroot durante el build de Docker, incluidos los modelos 3D.
var contentTypes = new FileExtensionContentTypeProvider();
contentTypes.Mappings[".glb"] = "model/gltf-binary";
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = contentTypes });

// Comprueba el proceso web; la conexión a PostgreSQL se comprueba por separado.
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// Acá se "engancha" el Hub de SignalR a una ruta
app.MapHub<RoomHub>("/hubs/room");

// Test de conexión -> https://localhost:7123/api/db-check si sale conectado:true salió bien
app.MapGet("/api/db-check", async (CasaliaDbContext db) =>
{
    bool conectado = await db.Database.CanConnectAsync();
    return Results.Ok(new { conectado });
});

app.MapFallbackToFile("index.html");

app.Run();
