import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNavigationStore } from "../../store/Navigation";


export const HeaderAdmin = () => {
  const { activeAdminItem, setActiveAdminItem } = useNavigationStore(); //para tener pagina actual y ponerle colorcito
  const [menuActivo, setMenuActivo] = useState(false);

  const toggleMenu = () => {
    setMenuActivo(!menuActivo);
  };
  const handleMenuItemClick = (item) => {
    setActiveAdminItem(item);
    window.scrollTo(0, 0); //para que siempre vaya al incio de la pagina

  };

  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/logIn");
  };

  return (
    <div className="headerAdminContainer">
      <header className="headerAdmin">
        <button
          id="btnn"
          className="headerAdmin__button-menu"
          onClick={toggleMenu}
        >
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
        <nav
          id="navv"
          className={`headerAdmin__nav ${menuActivo ? "activo" : ""}`}
        >
          <ul className="headerAdmin__nav__ul">
            <li
              className={`headerAdmin__nav__ul__li ${
                activeAdminItem === "productos" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="productos"
                to="/admin"
                onClick={() => handleMenuItemClick("productos")}
              >
                Productos
              </Link>
            </li>

            <li
              className={`headerAdmin__nav__ul__li ${
                activeAdminItem === "categorias" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="categorias"
                to="/admin/categories"
                onClick={() => handleMenuItemClick("categorias")}
              >
                Categorías
              </Link>
            </li>
            <li
              className={`headerAdmin__nav__ul__li ${
                activeAdminItem === "atributos" ? "activePage" : ""
              }`}
            >
              <Link
                data-active="atributos"
                to="/admin/attributes"
                onClick={() => handleMenuItemClick("atributos")}
              >
                Atributos
              </Link>
            </li>
            <li>
              <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
