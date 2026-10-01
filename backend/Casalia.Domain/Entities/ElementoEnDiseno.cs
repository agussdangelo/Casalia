using System;

namespace Casalia.Domain.Entities;

public class ElementoEnDiseno
{
    public long Id { get; set; }
    public double PosicionX { get; set; }
    public double PosicionY { get; set; }
    public double PosicionZ { get; set; }
    public double Rotacion { get; set; }
    public double Escala { get; set; } = 1.0; // Tamaño original del modelo 3D, por defecto es 1.0 (100%)

    public long DisenoId { get; set; }
    public Diseno Diseno { get; set; } = null!;

    public long ModeloId { get; set; }
    public Modelo3D Modelo { get; set; } = null!;
}
