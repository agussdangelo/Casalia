using System;

namespace Casalia.Domain.Entities;

public class Propiedad
{
public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;

    public ICollection<Categoria> Categorias { get; set; } = new List<Categoria>();
}
