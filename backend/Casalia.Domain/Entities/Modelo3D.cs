using System;
using Casalia.Domain.Enums;
using Casalia.Domain.Interfaces;

namespace Casalia.Domain.Entities;

public class Modelo3D : IReportable
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string MiniaturaUrl { get; set; } = string.Empty;
    public OrigenModelo3D Origen { get; set; }
    public double AnchoReal { get; set; }
    public double AltoReal { get; set; }
    public double ProfundidadReal { get; set; }

    public long? CreadorId { get; set; }
    public Usuario? Creador { get; set; }

    public ICollection<Categoria> Categorias { get; set; } = new List<Categoria>();
}
