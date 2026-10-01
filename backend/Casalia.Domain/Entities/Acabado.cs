using System;

namespace Casalia.Domain.Entities;

public class Acabado
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? UrlTextura { get; set; }
    public string? Color { get; set; }
}
