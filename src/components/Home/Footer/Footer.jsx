import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";


export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer__principal">
          <div className="footer__principal__menu">
            <h4>Santería Chacabuco</h4>
            <ul>
              <li>
                <Link data-active="index" to="/">
                  Bienvenido
                </Link>{" "}
              </li>
              <li>
                <Link data-active="productos" to="/productos">
                  Productos
                </Link>{" "}
              </li>
              <li>
                <Link data-active="como_comprar" to="/como_comprar">
                  Cómo Comprar
                </Link>{" "}
              </li>
              <li>
                <Link data-active="la_empresa" to="/la_empresa">
                  La Empresa
                </Link>{" "}
              </li>
              <li>
                <Link data-active="contacto" to="/contacto">
                  Contacto
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="footer__principal__contacto">
            <ul>
              <li className="mail">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:santeriachacabuco@hotmail.com">santeriachacabuco@hotmail.com</a>
              </li>
              <li className="ubicacion">
                <FontAwesomeIcon icon={faLocationDot} />
                <a target='_blank' href="https://maps.google.com/maps?q=Santería Chacabuco, Bv. Chacabuco 21, Córdoba, Córdoba, Argentina">Santería Chacabuco, Bv. Chacabuco 21, Córdoba</a>
              </li>
              <li className="telefono">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+543514258191">+543514258191</a>
              </li>
              <li className="whatsapp">
                <FontAwesomeIcon icon={faWhatsapp} />
                <a href="https://web.whatsapp.com/send?phone=+5493518026540" target="_blank" >+5493518026540</a>
              </li>
              <li className="facebook">
                <FontAwesomeIcon icon={faFacebook} />
                <a href="https://www.facebook.com/100057038396959" target="_blank" >Santería Chacabuco</a>
              </li>
              <li className="instagram">
                <FontAwesomeIcon icon={faInstagram} />
                <a href="https://instagram.com/santeriachacabuco" target="_blank" >santeriachacabuco</a>
              </li>
            </ul>
          </div>
          {/* <div className="footer__principal__compartir">
            <h4>Compartir en</h4>
            <ul>
              <li>
                <a href="">tw</a>
              </li>
              <li>
                <a href="">fb</a>
              </li>
              <li>
                <a href="">pin</a>
              </li>
              <li>
                <a href="">in</a>
              </li>
              <li>
                <a href="">wsp</a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="footer__copyright">
          <span>Copyright ©</span> | <span>Santería Chacabuco</span>
        </div>
      </footer>
    </div>
  );
};
