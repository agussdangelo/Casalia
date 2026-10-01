using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class ElementoEnDisenoConfiguration : IEntityTypeConfiguration<ElementoEnDiseno>
{
    public void Configure(EntityTypeBuilder<ElementoEnDiseno> builder)
    {
        builder.HasKey(e => e.Id);

        // Modelo obligatorio. No se puede borrar un modelo que está
        // siendo usado en algún diseño (Restrict)
        builder.HasOne(e => e.Modelo)
            .WithMany()
            .HasForeignKey(e => e.ModeloId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}