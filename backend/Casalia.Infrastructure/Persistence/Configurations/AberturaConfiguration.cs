using System;
using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class AberturaConfiguration : IEntityTypeConfiguration<Abertura>
{
    public void Configure(EntityTypeBuilder<Abertura> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Tipo)
            .HasConversion<string>();

// Modelo 3D: Si se borra el modelo, la abertura queda sin modelo
        builder.HasOne(a => a.Modelo)
            .WithMany()
            .HasForeignKey(a => a.ModeloId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
