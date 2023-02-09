import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function SectionVentas() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="section1">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="section1__ventas"
      >
        <img src="./src/assets/ventas.png" alt="ventas" />
        <div className="text">
          <h4>Ventas</h4>
          <p>online y en el Local</p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="section1__envios"
      >
        <img src="./src/assets/envios.png" alt="envios" />
        <div className="text">
          <h4>Envíos</h4>
          <p>a domicilio y a todo el país</p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="section1__loque"
      >
        <img src="./src/assets/loquebusques.png" alt="" />
        <div className="text">
          <h4>Lo que busques</h4>
          <p>a un click de distancia</p>
        </div>
      </div>
    </section>
  );
}

export default SectionVentas;
