using System;

namespace Casalia.Domain.Entities;

public class Ambiente
{
    public long Id { get; set; }
    public double Altura { get; set; }

    public long DisenoId { get; set; }
    public Diseno Diseno { get; set; } = null!;

      public ICollection<Superficie> Superficies { get; set; } = new List<Superficie>();
}
