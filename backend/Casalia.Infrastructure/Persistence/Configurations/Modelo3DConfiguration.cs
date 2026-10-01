using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class Modelo3DConfiguration : IEntityTypeConfiguration<Modelo3D>
{
    public void Configure(EntityTypeBuilder<Modelo3D> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Url)
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
    }
}