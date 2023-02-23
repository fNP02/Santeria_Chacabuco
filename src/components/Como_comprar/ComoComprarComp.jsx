import React from "react";

export const ComoComprarComp = () => {
  return (
    <div className="comoComprar-page">
      <h1>Cómo Comprar</h1>
      <div className="div-casillas">
        <div className="casilla">
          <div className="num">
            <p>1</p>
          </div>
          <p className="title">Elegí tu producto favorito</p>
          <p className="description">
            Navegá en nuestra tienda y elegí los productos que más te gusten.
          </p>
        </div>
        <div className="casilla">
          <div className="num">
            <p>2</p>
          </div>
          <p className="title">Contacto</p>
          <p className="description">
            Una vez elegidos los productos, envianos un mensaje a través de
            WhatsApp al número 3518026540 con los productos que necesites.
            Luego, nos pondremos en contacto contigo para confirmar el stock.
          </p>
        </div>
        <div className="casilla">
          <div className="num">
            <p>3</p>
          </div>
          <p className="title">Forma de pago y envío</p>
          <p className="description">Elegí la forma de pago y el envío disponibles.</p>
        </div>
        <div className="casilla">
          <div className="num">
            <p>4</p>
          </div>
          <p className="title">Recibis el pedido</p>
          <p className="description">
            El pedido te llegará según las condiciones que hemos coordinado
            contigo. ¡Que lo disfrutes!
          </p>
        </div>
      </div>
    </div>
  );
};
