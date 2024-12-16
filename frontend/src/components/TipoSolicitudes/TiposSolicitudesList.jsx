import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const TiposSolicitudes = () => {
  const { tiposSolicitudes, setTiposSolicitudes } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5168/api/tiposolicitudes")
      .then((response) => response.json())
      .then((data) => setTiposSolicitudes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [setTiposSolicitudes]);

  const filteredTipos = tiposSolicitudes.filter((tipo) =>
    tipo.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (tipo) => {
    navigate(`/tipos-solicitudes/editar/${tipo.id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5168/api/tiposolicitudes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Simular soft-delete local (si Activo existe)
          setTiposSolicitudes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, activo: false } : t))
          );
        } else {
          console.error("Error deleting tipo");
        }
      })
      .catch((error) => console.error("Error deleting tipo:", error));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Tipos de Solicitudes</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/tipos-solicitudes/crear")}
        >
          Crear Nuevo
        </button>
      </div>
      <div className="row mb-3 mt-3">
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar tipo de solicitud..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTipos
            .filter((tipo) => tipo.activo !== false) // Mostrar solo activos si tienes soft-delete
            .map((tipo) => (
              <tr key={tipo.id}>
                <td>{tipo.id}</td>
                <td>{tipo.nombre}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(tipo)}
                  >
                    <FontAwesomeIcon icon="edit" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(tipo.id)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            ))}

          {filteredTipos.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TiposSolicitudes;
