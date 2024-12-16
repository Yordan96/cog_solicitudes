using Microsoft.EntityFrameworkCore;
using SolicitudesAPI.Models;

namespace SolicitudesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TipoSolicitud> TiposSolicitudes { get; set; } = null!;
        public DbSet<Solicitud> Solicitudes { get; set; } = null!;
    }
}
