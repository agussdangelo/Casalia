using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class Modelo3DConfiguration : IEntityTypeConfiguration<Modelo3D>
{
    public void Configure(EntityTypeBuilder<Modelo3D> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(m => m.Url)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(m => m.MiniaturaUrl)
            .IsRequired()
            .HasMaxLength(500);

        // Guarda el enum como texto ("Generico", "Usuario")
        builder.Property(m => m.Origen)
            .HasConversion<string>();

        // Creador opcional (solo con origen Usuario).
        // Restrict: no se puede borrar un usuario que tiene modelos creados
        builder.HasOne(m => m.Creador)
            .WithMany()
            .HasForeignKey(m => m.CreadorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relación N:N con Categoria
        builder.HasMany(m => m.Categorias)
            .WithMany()
            .UsingEntity<Dictionary<string, object>>(
                "Modelo3DCategoria",
                r => r.HasOne<Categoria>().WithMany().HasForeignKey("CategoriaId"),
                l => l.HasOne<Modelo3D>().WithMany().HasForeignKey("Modelo3DId"));
    }
}