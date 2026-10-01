using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(255);

        // Dos usuarios no pueden tener el mismo email
        builder.HasIndex(u => u.Email)
            .IsUnique();

        // Guarda los enums como texto ("Google") y no como número (1)
        builder.Property(u => u.ProveedorAuth)
            .HasConversion<string>();

        builder.Property(u => u.Rol)
            .HasConversion<string>();
    }
}