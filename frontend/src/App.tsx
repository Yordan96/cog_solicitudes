import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import TiposSolicitudes from "./pages/TiposSolicitudes";
import Solicitudes from "./pages/Solicitudes";

function App() {

  return (
    <AppProvider>
      <Router>
        <div className="container">
          <h1 className="mt-4">Gestión de Solicitudes</h1>
          <Routes>
            <Route path="/tipos-solicitudes" element={<TiposSolicitudes />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
