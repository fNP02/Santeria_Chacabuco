import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };

  return (
<div className="headerContainer">

    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="/src/assets/logo.png" alt="" />
        </Link>
      </div>

      <button id="btnn" className="header__button-menu" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="svg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <nav id="navv" className={`header__nav ${menuActivo ? "activo" : ""}`}>
        <ul className="header__nav__ul flex">
          <li className="header__nav__ul__li">
            <Link data-active="index" to="/">
              Bienvenido
            </Link>
          </li>
          <li className="header__nav__ul__li">
            <Link data-active="productos" to="/productos">
              Productos
            </Link>
          </li>
          <li className="header__nav__ul__li">
            <Link data-active="como_comprar" to="/como_comprar">
              Cómo Comprar
            </Link>
          </li>
          <li className="header__nav__ul__li">
            <Link data-active="la_empresa" to="/la_empresa">
              La Empresa
            </Link>
          </li>
          <li className="header__nav__ul__li">
            <Link data-active="contacto" to="/contacto">
              Contacto
            </Link>

            
            <Link data-active="admin" to="/admin">
        Admin
      </Link>

      
          </li>
        </ul>
      </nav>
    </header>
</div>
  );
}

export default Header;
