using Microsoft.AspNetCore.Mvc;
using SolicitudesAPI.Data;
using SolicitudesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace SolicitudesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoSolicitudesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoSolicitudesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTiposSolicitudes()
        {
            var tipos = await _context.TiposSolicitudes.Where(t => t.Activo).ToListAsync();
            return Ok(tipos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTipoSolicitud(int id)
        {
            var tipoSolicitud = await _context.TiposSolicitudes.FindAsync(id);
            if (tipoSolicitud == null) return NotFound();
            return Ok(tipoSolicitud);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTipoSolicitud(TipoSolicitud tipoSolicitud)
        {
            _context.TiposSolicitudes.Add(tipoSolicitud);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTipoSolicitud), new { id = tipoSolicitud.Id }, tipoSolicitud);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTipoSolicitud(int id, TipoSolicitud tipoSolicitud)
        {
            if (id != tipoSolicitud.Id) return BadRequest();

            _context.Entry(tipoSolicitud).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Soft delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoSolicitud(int id)
        {
            var tipoSolicitud = await _context.TiposSolicitudes.FindAsync(id);
            if (tipoSolicitud == null)
            {
                return NotFound();
            }

            // Cambiar estado a inactivo
            tipoSolicitud.Activo = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /* ELIMINACION DEL REGISTRO (HARD DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoSolicitud(int id)
        {
            var tipoSolicitud = await _context.TiposSolicitudes.FindAsync(id);
            if (tipoSolicitud == null) return NotFound();

            _context.TiposSolicitudes.Remove(tipoSolicitud);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        */
    }
}
