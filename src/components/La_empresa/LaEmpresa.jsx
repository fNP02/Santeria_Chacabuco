import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const LaEmpresa = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="laEmpresa-page">
      <div className="caption" data-aos="fade-right" data-aos-duration="1000">
        <p className="title">Santería Chacabuco</p>
        <div className="description">
          <p>
            Santería Chacabuco es una empresa familiar dedicada a la
            comercialización de productos dentro de Argentina. Se especializa en
            una amplia variedad de productos, entre ellos, Artículos Religiosos,
            Imágenes Santorales Nacionales e Importadas, Hierbas Medicinales,
            Piedras Semipreciosas, Sahumerios Nacionales e Importados, Artículos
            Esotéricos, Velas Lisas, Santorales y Artesanales.
          </p>
          <p>
            Nuestra meta es realizar una atención personalizada a cada cliente,
            teniendo en cuenta sus necesidades y buscando la mejor manera de
            satisfacerlas. Ofrecemos una gran variedad de productos con el
            objetivo de lograr que sean acordes a las preferencias de todas las
            personas.
          </p>
          <p>
            Desde hace más de 40 años como empresa, juntos por y para ustedes!
          </p>
        </div>
      </div>
      <div
        className="image"
        data-aos="fade"
        data-aos-duration="1000"
      ></div>
    </div>
  );
};
