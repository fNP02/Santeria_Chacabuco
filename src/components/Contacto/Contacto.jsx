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

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const Contacto = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="contacto-div">
      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.237649771161!2d-64.18186819922528!3d-31.417440781340808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a29b0b4bb8a9%3A0x7ae638a6c9e5b7cb!2sSanter%C3%ADa%20Chacabuco!5e0!3m2!1ses-419!2sar!4v1677089605721!5m2!1ses-419!2sar"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <h1 className="title">Contacto</h1>
      <div className="information">
        <div className="redes">
          <ul>
            <li className="whatsapp">
              <p>Whatsapp</p>
              <FontAwesomeIcon className="icon" icon={faWhatsapp} />
              <a
                href="https://web.whatsapp.com/send?phone=+5493518026540"
                target="_blank"
              >
                +5493518026540
              </a>
            </li>

            <li className="telefono">
              <p>Teléfono (llamadas)</p>
              <FontAwesomeIcon className="icon" icon={faPhone} />
              <a href="tel:+543514258191">+543514258191</a>
            </li>

            <li className="facebook">
              <p>Facebook</p>
              <FontAwesomeIcon className="icon" icon={faFacebook} />
              <a
                href="https://www.facebook.com/100057038396959"
                target="_blank"
              >
                Santería Chacabuco
              </a>
            </li>
            <li className="instagram">
              <p>Instagram</p>
              <FontAwesomeIcon className="icon" icon={faInstagram} />
              <a href="https://instagram.com/santeriachacabuco" target="_blank">
                santeriachacabuco
              </a>
            </li>
            <li className="mail">
              <p>Email</p>
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <a href="mailto:santeriachacabuco@hotmail.com">
                santeriachacabuco@hotmail.com
              </a>
            </li>

            <li className="ubicacion">
              <p>Dirección</p>
              <FontAwesomeIcon className="icon" icon={faLocationDot} />
              <a
                target="_blank"
                href="https://maps.google.com/maps?q=Santería Chacabuco, Bv. Chacabuco 21, Córdoba, Córdoba, Argentina"
              >
                Santería Chacabuco, Bv. Chacabuco 21, Córdoba
              </a>
            </li>
          </ul>
        </div>
        <div className="form" data-aos="fade-right" data-aos-duration="1000">
          <p className="form__title">Formulario de contacto</p>
          <form action="">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea type="text" id="mensaje" name="mensaje" className="input" />
            <button className="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
