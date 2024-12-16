namespace SolicitudesAPI.Models
{
    public class Solicitud
    {
        public int Id { get; set; }
        public string Solicitante { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public bool Activo { get; set; } = true; // Por defecto activo

        public int TipoSolicitudId { get; set; }
        public TipoSolicitud? TipoSolicitud { get; set; }
    }
}