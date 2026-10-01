using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Casalia.Infrastructure.Persistence.Configurations;

public class SuperficieConfiguration : IEntityTypeConfiguration<Superficie>
{
    public void Configure(EntityTypeBuilder<Superficie> builder)
    {
        builder.HasKey(s => s.Id);

        // Herencia TPH (Table Per Hierarchy): una sola tabla "Superficies" con una columna "Tipo"
        // que indica si la fila es Pared, Piso o Techo
        builder.HasDiscriminator<string>("Tipo")
            .HasValue<Pared>("Pared")
            .HasValue<Piso>("Piso")
            .HasValue<Techo>("Techo");

        // Si se borra el acabado, la superficie queda sin acabado
        builder.HasOne(s => s.Acabado)
            .WithMany()
            .HasForeignKey(s => s.AcabadoId)
            .OnDelete(DeleteBehavior.SetNull);

        // Aberturas: si se borra la superficie se borran sus aberturas
        builder.HasMany(s => s.Aberturas)
            .WithOne(a => a.Superficie)
            .HasForeignKey(a => a.SuperficieId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}