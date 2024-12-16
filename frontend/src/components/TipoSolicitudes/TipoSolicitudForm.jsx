import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const TipoSolicitudForm = () => {
  const { id } = useParams();
  const { tiposSolicitudes, setTiposSolicitudes } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (id) {
      // Modo edición: Obtener datos del tipo a editar
      fetch(`http://localhost:5168/api/tiposolicitudes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          reset(data); // Rellena el formulario con los datos actuales
        })
        .catch((error) => console.error("Error fetching tipo:", error));
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    if (id) {
      // Editar (PUT)
      fetch(`http://localhost:5168/api/tiposolicitudes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: parseInt(id) })
      })
        .then((res) => {
          if (res.ok) {
            // Actualizar localmente
            setTiposSolicitudes((prev) =>
              prev.map((tipo) => (tipo.id === parseInt(id) ? { ...tipo, ...data } : tipo))
            );
            navigate("/tipos-solicitudes");
          } else {
            console.error("Error updating tipo");
          }
        })
        .catch((error) => console.error("Error updating tipo:", error));
    } else {
      // Crear (POST)
      fetch("http://localhost:5168/api/tiposolicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((newTipo) => {
          setTiposSolicitudes((prev) => [...prev, newTipo]);
          navigate("/tipos-solicitudes");
        })
        .catch((error) => console.error("Error creating tipo:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Tipo de Solicitud" : "Crear Tipo de Solicitud"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3 col-md-4">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/tipos-solicitudes")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default TipoSolicitudForm;
