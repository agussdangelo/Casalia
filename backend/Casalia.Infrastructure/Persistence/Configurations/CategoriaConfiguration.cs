using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class CategoriaConfiguration : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(c => c.Propiedad)
            .WithMany(p => p.Categorias)
            .HasForeignKey(c => c.PropiedadId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
