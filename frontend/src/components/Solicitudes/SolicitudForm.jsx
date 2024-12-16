import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const SolicitudForm = () => {
  const { id } = useParams();
  const { solicitudes, setSolicitudes, tiposSolicitudes, setTiposSolicitudes } = useContext(AppContext);
  const navigate = useNavigate();

  const [loadingTipos, setLoadingTipos] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Cargar tipos de solicitudes al montar el componente
  useEffect(() => {
    fetch("http://localhost:5168/api/tiposolicitudes")
      .then((res) => res.json())
      .then((data) => {
        setTiposSolicitudes(data);
        setLoadingTipos(false);
      })
      .catch((error) => console.error("Error fetching tipos:", error));
  }, [setTiposSolicitudes]);

  useEffect(() => {
    if (id) {
      // Modo edición: Obtener datos de la solicitud
      fetch(`http://localhost:5168/api/solicitudes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          reset(data);
        })
        .catch((error) => console.error("Error fetching solicitud:", error));
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    if (id) {
      // Editar
      fetch(`http://localhost:5168/api/solicitudes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: parseInt(id) })
      })
        .then((res) => {
          if (res.ok) {
            setSolicitudes((prev) =>
              prev.map((sol) => (sol.id === parseInt(id) ? { ...sol, ...data } : sol))
            );
            navigate("/solicitudes");
          } else {
            console.error("Error updating solicitud");
          }
        })
        .catch((error) => console.error("Error updating solicitud:", error));
    } else {
      // Crear
      fetch("http://localhost:5168/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((newSolicitud) => {
          setSolicitudes((prev) => [...prev, newSolicitud]);
          navigate("/solicitudes");
        })
        .catch((error) => console.error("Error creating solicitud:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Solicitud" : "Crear Solicitud"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="solicitante" className="form-label">Solicitante</label>
            <input
              type="text"
              id="solicitante"
              className={`form-control ${errors.solicitante ? "is-invalid" : ""}`}
              {...register("solicitante", { required: "El solicitante es obligatorio" })}
            />
            {errors.solicitante && <div className="invalid-feedback">{errors.solicitante.message}</div>}
          </div>
          <div className="mb-3 col-md-6" >
            <label htmlFor="tipoSolicitudId" className="form-label">Tipo de Solicitud</label>
            {loadingTipos ? (
              <div>Cargando tipos...</div>
            ) : (
              <select
                id="tipoSolicitudId"
                className={`form-control ${errors.tipoSolicitudId ? "is-invalid" : ""}`}
                {...register("tipoSolicitudId", { required: "El tipo de solicitud es obligatorio" })}
              >
                <option value="">Seleccione un tipo</option>
                {tiposSolicitudes
                  .filter((t) => t.activo !== false) // si se manejan tipos inactivos
                  .map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
              </select>
            )}
            {errors.tipoSolicitudId && <div className="invalid-feedback">{errors.tipoSolicitudId.message}</div>}
          </div>
          <div className="mb-3 col-md-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
              {...register("descripcion", { required: "La descripción es obligatoria" })}
            ></textarea>
            {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">{id ? "Actualizar" : "Guardar"}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/solicitudes")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default SolicitudForm;
