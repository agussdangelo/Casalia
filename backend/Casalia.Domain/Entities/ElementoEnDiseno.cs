using System;
using Casalia.Domain.Enums;

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

public void Transformar(double x, double y, double z, double rotacion, double escala)
{
    if (escala <= 0)
        throw new ArgumentException("La escala debe ser mayor a 0.", nameof(escala));

    bool escalaCambio = Math.Abs(escala - Escala) > 0.0001;
    if (Modelo.Origen != OrigenModelo3D.Generico && escalaCambio)
        throw new InvalidOperationException("Solo los modelos genéricos pueden cambiar de escala.");

    PosicionX = x;
    PosicionY = y;
    PosicionZ = z;
    Rotacion = ((rotacion % 360) + 360) % 360;
    Escala = escala;
}

}
