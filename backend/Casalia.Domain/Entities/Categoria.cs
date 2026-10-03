using System;

namespace Casalia.Domain.Entities;

public class Categoria
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public long PropiedadId { get; set; }
    public Propiedad Propiedad { get; set; } = null!;
}
