using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolicitudesAPI.Data;
using SolicitudesAPI.Models;

namespace SolicitudesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitudesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SolicitudesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSolicitudes()
        {
            var tipos = await _context.Solicitudes.Where(s => s.Activo).ToListAsync();
            return Ok(tipos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSolicitud(int id)
        {
            var solicitud = await _context.Solicitudes.Include(s => s.TipoSolicitud).FirstOrDefaultAsync(s => s.Id == id);
            if (solicitud == null) return NotFound();
            return Ok(solicitud);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSolicitud(Solicitud solicitud)
        {
            _context.Solicitudes.Add(solicitud);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSolicitud), new { id = solicitud.Id }, solicitud);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSolicitud(int id, Solicitud solicitud)
        {
            if (id != solicitud.Id) return BadRequest();

            _context.Entry(solicitud).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitud(int id)
        {
            var solicitud = await _context.Solicitudes.FindAsync(id);
            if (solicitud == null)
            {
                return NotFound();
            }

            // Cambiar estado a inactivo
            solicitud.Activo = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /* elimina por completo el registro
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitud(int id)
        {
            var solicitud = await _context.Solicitudes.FindAsync(id);
            if (solicitud == null) return NotFound();

            _context.Solicitudes.Remove(solicitud);
            await _context.SaveChangesAsync();
            return NoContent();
        }*/
    }
}
