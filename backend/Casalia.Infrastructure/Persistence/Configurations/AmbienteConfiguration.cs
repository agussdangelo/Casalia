using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class AmbienteConfiguration : IEntityTypeConfiguration<Ambiente>
{
    public void Configure(EntityTypeBuilder<Ambiente> builder)
    {
        builder.HasKey(a => a.Id);

        // Superficies: si se borra el ambiente se borran sus superficies
        builder.HasMany(a => a.Superficies)
            .WithOne(s => s.Ambiente)
            .HasForeignKey(s => s.AmbienteId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}