using Casalia.Domain.Entities;

namespace Casalia.Application.Ports;

public interface IDisenoRepositorio
{
    Task<Diseno?> ObtenerConElementosAsync(long disenoId, CancellationToken ct);
    Task GuardarCambiosAsync(CancellationToken ct);
}
