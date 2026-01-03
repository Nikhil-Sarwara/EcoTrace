using Microsoft.EntityFrameworkCore;
using EcoTrace.Core;

namespace EcoTrace.Data;

public class EcoTraceDbContext : DbContext
{
    public EcoTraceDbContext(DbContextOptions<EcoTraceDbContext> options) : base(options)
    {
    }

    public DbSet<CarbonActivity> Activities { get; set; }
}