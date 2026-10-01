using System;

namespace Casalia.Domain.Entities;

public class Pared : Superficie
{
    public double PuntoInicioX { get; set; }
    public double PuntoInicioZ { get; set; }
    public double PuntoFinX { get; set; }
    public double PuntoFinZ { get; set; }
}
