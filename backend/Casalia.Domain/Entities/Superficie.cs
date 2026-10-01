using System;

namespace Casalia.Domain.Entities;

public abstract class Superficie
{
    public long Id { get; set; }

    public long AmbienteId { get; set; }
    public Ambiente Ambiente { get; set; } = null!;

    public long? AcabadoId { get; set; }
    public Acabado? Acabado { get; set; }

    public ICollection<Abertura> Aperturas { get; set; } = new List<Abertura>();
}
