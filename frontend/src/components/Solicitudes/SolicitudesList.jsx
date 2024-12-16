import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Solicitudes = () => {
  const { solicitudes, setSolicitudes } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5168/api/solicitudes")
      .then((response) => response.json())
      .then((data) => setSolicitudes(data))
      .catch((error) => console.error("Error fetching solicitudes:", error));
  }, [setSolicitudes]);

  const filteredSolicitudes = solicitudes.filter((sol) =>
    sol.solicitante.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (solicitud) => {
    navigate(`/solicitudes/editar/${solicitud.id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5168/api/solicitudes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setSolicitudes((prev) =>
            prev.map((s) => (s.id === id ? { ...s, activo: false } : s))
          );
        } else {
          console.error("Error deleting solicitud");
        }
      })
      .catch((error) => console.error("Error deleting solicitud:", error));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Solicitudes</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/solicitudes/crear")}
        >
          Crear Nueva
        </button>
      </div>
      <div className="row mb-3 mt-3">
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por solicitante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solicitante</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSolicitudes
            .filter((s) => s.activo !== false) // si se maneja un campo Activo
            .map((sol) => (
              <tr key={sol.id}>
                <td>{sol.id}</td>
                <td>{sol.solicitante}</td>
                <td>{sol.descripcion}</td>
                <td>{sol.tipoSolicitud ? sol.tipoSolicitud.nombre : "N/A"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(sol)}
                  >
                    <FontAwesomeIcon icon="edit" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(sol.id)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            ))}

          {filteredSolicitudes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
