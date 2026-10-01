using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Casalia.Infrastructure.Persistence;

public class CasaliaDbContext : DbContext
{
 public CasaliaDbContext(DbContextOptions<CasaliaDbContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Diseno> Disenos => Set<Diseno>();
    public DbSet<Ambiente> Ambientes => Set<Ambiente>();
    public DbSet<Superficie> Superficies => Set<Superficie>();
    public DbSet<Acabado> Acabados => Set<Acabado>();
    public DbSet<Abertura> Aberturas => Set<Abertura>();
    public DbSet<ElementoEnDiseno> ElementosEnDiseno => Set<ElementoEnDiseno>();
    public DbSet<Modelo3D> Modelos3D => Set<Modelo3D>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Registra automáticamente todas las clases de configuración
        // (UsuarioConfiguration, etc.) que estén en este proyecto,
        // para no tener que agregarlas una por una.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CasaliaDbContext).Assembly);
    }
}
