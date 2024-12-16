namespace SolicitudesAPI.Models
{
    public class TipoSolicitud
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public bool Activo { get; set; } = true; // Por defecto activo
    }
}