import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigationStore } from "../../../store/Navigation";

function Header() {
  const [menuActivo, setMenuActivo] = useState(false);

  const { activeItem, setActiveItem } = useNavigationStore(); //para tener pagina actual y ponerle colorcito

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    window.scrollTo(0, 0); //para que siempre vaya al incio de la pagina

  };

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
            <li
              className={`header__nav__ul__li ${
                activeItem === "home" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="index"
                to="/"
                onClick={() => handleMenuItemClick("home")}
              >
                Bienvenido
              </Link>
            </li>

            <li
              className={`header__nav__ul__li ${
                activeItem === "products" ? "activePage" : ""
              }`}
              onClick={() => handleMenuItemClick("products")}
            >
              <Link
                data-active="productos"
                to="/productos"
                onClick={() => handleMenuItemClick("products")}
              >
                Productos
              </Link>
            </li>
            <li
              className={`header__nav__ul__li ${
                activeItem === "comoComprar" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="como_comprar"
                to="/como_comprar"
                onClick={() => handleMenuItemClick("comoComprar")}
              >
                Cómo Comprar
              </Link>
            </li>
            <li
              className={`header__nav__ul__li ${
                activeItem === "laEmpresa" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="la_empresa"
                to="/la_empresa"
                onClick={() => handleMenuItemClick("laEmpresa")}
              >
                La Empresa
              </Link>
            </li>
            <li
              className={`header__nav__ul__li ${
                activeItem === "contacto" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="contacto"
                to="/contacto"
                onClick={() => handleMenuItemClick("contacto")}
              >
                Contacto
              </Link>
              <Link data-active="admin" to="/logIn">
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
