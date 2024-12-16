import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import TiposSolicitudes from "./components/TipoSolicitudes/TiposSolicitudesList";
import TiposSolicitudesForm from "./components/TipoSolicitudes/TipoSolicitudForm";
import Solicitudes from "./components/Solicitudes/SolicitudesList";
import SolicitudForm from "./components/Solicitudes/SolicitudForm";
import Header from "./components/Header"


function App() {
  return (
    <AppProvider>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            {/* Rutas para tipos de solicitudes */}
            <Route path="/tipos-solicitudes" element={<TiposSolicitudes />} />
            <Route path="/tipos-solicitudes/crear" element={<TiposSolicitudesForm />} />
            <Route path="/tipos-solicitudes/editar/:id" element={<TiposSolicitudesForm />} />

            {/* Rutas para solicitudes */}
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/solicitudes/crear" element={<SolicitudForm />} />
            <Route path="/solicitudes/editar/:id" element={<SolicitudForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
