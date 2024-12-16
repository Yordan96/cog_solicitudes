import React from "react";
import { useForm } from "react-hook-form";

const TipoSolicitudForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default TipoSolicitudForm;
