using Casalia.Application.Ports;
using Casalia.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Casalia.Infrastructure.Persistence.Repositories;

public class DisenoRepositorio : IDisenoRepositorio
{
    private readonly CasaliaDbContext _db;

    public DisenoRepositorio(CasaliaDbContext db)
    {
        _db = db;
    }

    public Task<Diseno?> ObtenerDisenoConElementosAsync(long disenoId, CancellationToken ct)
    {
        return _db.Disenos
            .Include(d => d.Elementos)
                .ThenInclude(e => e.Modelo)
            .FirstOrDefaultAsync(d => d.Id == disenoId, ct);
    }

    public Task GuardarCambiosAsync(CancellationToken ct)
    {
        return _db.SaveChangesAsync(ct);
    }
}