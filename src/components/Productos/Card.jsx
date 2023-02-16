import { useParams } from "react-router-dom";
import { useProducts } from "../../store/Products";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import prueba from "../../JSONprueba.json";

export const Card = () => {
  // const { getPosts } = useProducts();
  // useEffect(() => {
  //   //para que se ejecute una vez
  //   getPosts();
  // }, []);

  const { productId } = useParams();
  const product = prueba.find((product) => product.id == productId);
  console.log(productId);
  return (
    <div className="productCard">
      <div className="div-volver">
        <Link data-active="index" to="/productos">
          {"<"} Volver
        </Link>
      </div>
      <div className="div-product">
        <div className="div-img">
          <img className="img" src={product.img} alt="" />
        </div>
        <div className="caption">
          <h1 className="title">{product.title}</h1>
          <hr />
          <p className="price">
                $ <span>{product.price}</span>
              </p>
          <hr />
          <h3 className="description">{product.description}</h3>
        </div>
      </div>
    </div>
  );
};
