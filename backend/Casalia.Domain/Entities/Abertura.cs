using System;
using Casalia.Domain.Enums;

namespace Casalia.Domain.Entities;

public class Abertura
{
    public long Id { get; set; }
    public double U { get; set; }
    public double V { get; set; }
    public double Ancho { get; set; }
    public double Alto { get; set; }
    public TipoAbertura Tipo { get; set; }

    public long SuperficieId { get; set; }
    public Superficie Superficie { get; set; } = null!;

    public long? ModeloId { get; set; }
    public Modelo3D? Modelo { get; set; }
}
