using System;

namespace Casalia.Domain.Entities;

public class Diseno
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public DateTime FechaCreacion { get; set; }
    public DateTime FechaModificacion { get; set; }
    public decimal? Presupuesto { get; set; } 
    
    public long AutorId { get; set; }
    public Usuario Autor { get; set; } = null!;

    public ICollection<Ambiente> Ambientes { get; set; } = new List<Ambiente>();
    public ICollection<ElementoEnDiseno> Elementos { get; set; } = new List<ElementoEnDiseno>();

    public void MarcarComoModificado() => FechaModificacion = DateTime.UtcNow;

}
