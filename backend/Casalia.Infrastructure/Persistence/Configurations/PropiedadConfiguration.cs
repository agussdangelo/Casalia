using System;
using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class PropiedadConfiguration : IEntityTypeConfiguration<Propiedad>
{
    public void Configure(EntityTypeBuilder<Propiedad> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Nombre)
            .IsRequired()
            .HasMaxLength(100);
    }
}
