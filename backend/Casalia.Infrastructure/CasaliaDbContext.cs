using Microsoft.EntityFrameworkCore;

namespace Casalia.Infrastructure;

public class CasaliaDbContext : DbContext
{
 public CasaliaDbContext(DbContextOptions<CasaliaDbContext> options)
        : base(options)
    {
    }
}
