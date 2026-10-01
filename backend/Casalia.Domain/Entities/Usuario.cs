using System;
using Casalia.Domain.Enums;

namespace Casalia.Domain.Entities;

public class Usuario
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PasswordHash { get; set; }
    public DateTime FechaRegistro { get; set; }
    public ProveedorAuth ProveedorAuth { get; set; }
    public RolUsuario Rol { get; set; }
}
