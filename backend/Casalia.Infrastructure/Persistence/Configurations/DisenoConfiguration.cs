using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class DisenoConfiguration : IEntityTypeConfiguration<Diseno>
{
    public void Configure(EntityTypeBuilder<Diseno> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(d => d.Descripcion)
            .HasMaxLength(500);

        // 16 dígitos enteros y 2 decimales
        builder.Property(d => d.Presupuesto)
            .HasPrecision(18, 2);

        // Restrict no permite borrar usuarios que tengan diseños asociados
        builder.HasOne(d => d.Autor)
            .WithMany()
            .HasForeignKey(d => d.AutorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Ambientes: si se borra el diseño se borran sus ambientes
        builder.HasMany(d => d.Ambientes)
            .WithOne(a => a.Diseno)
            .HasForeignKey(a => a.DisenoId)
            .OnDelete(DeleteBehavior.Cascade);

        // Elementos del diseño: si se borra el diseño se borran sus elementos
        builder.HasMany(d => d.Elementos)
            .WithOne(e => e.Diseno)
            .HasForeignKey(e => e.DisenoId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}