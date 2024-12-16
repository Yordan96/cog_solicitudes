import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import logoBlanco from '../../assets/logo-blanco.png'

const Header = () => {

    const navigate = useNavigate();

    const handleSolicitudes = () => {
        navigate(`/solicitudes`);
    };

    const handleTipos = () => {
        navigate(`/tipos-solicitudes`);
    };

    return (
        <div className="header">
            <img src={logoBlanco} alt="" />
            <div>
                <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => handleTipos()}
                >
                    Tipos Solicitudes
                </button>
                <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => handleSolicitudes()}
                >
                    Solicitudes
                </button>
            </div>
        </div>
    );
};

export default Header;
