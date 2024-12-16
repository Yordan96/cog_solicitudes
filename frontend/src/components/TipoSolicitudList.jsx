import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const TiposSolicitudes = () => {
  const { tiposSolicitudes, setTiposSolicitudes } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:5168/api/tiposSolicitudes")
      .then((response) => response.json())
      .then((data) => setTiposSolicitudes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [setTiposSolicitudes]);

  return (
    <div className="container mt-4">
      <h2>Tipos de Solicitudes</h2>
      <ul className="list-group">
        {tiposSolicitudes.map((tipo) => (
          <li key={tipo.id} className="list-group-item">
            {tipo.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TiposSolicitudes;