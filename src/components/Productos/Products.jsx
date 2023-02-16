import React from "react";
import { Card } from "./Card";
import { useProducts } from "../../store/Products";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import prueba from "../../JSONprueba.json";

import { useResults } from "../../store/Busqueda"; // para ver si mostrar busqueda o productos

export const Products = () => {
  const { posts } = useProducts();
  const { getPosts } = useProducts();

  //aca seecciona si es de busqueda o desde productos
  const { busquedaActiva, resultsFound } = useResults();
  // const aMostrar = busquedaActiva ? prueba : resultsFound;
  // console.log(aMostrar);

  useEffect(() => {
    //para que se ejecute una vez
    getPosts();
  }, []);

  function handleClickProduct(id) {
    console.log(id);
  }

  return (
    <div className="productsPage">
      <h1>Productos</h1>
      <div className="productsContainer">
        {resultsFound.length>0?(
        resultsFound.map((product) => (
          <div key={product.id} className="product">
            <Link
              data-active="productById"
              to={`/productos/productById/${product.id}`}
            >
              <div className="product__img">
                <img
                  className="img"
                  src={product.img}
                  alt=""
                  onClick={() => handleClickProduct(product.id)}
                />
              </div>
            </Link>
            <div className="product__caption">
              <p className="product__caption-monto">
                $ <span className="monto">{product.price}</span>
              </p>
              <header>
                <h3
                  className="product__caption-title"
                  onClick={() => handleClickProduct(product.id)}
                >
                  {product.title}
                </h3>
              </header>
              <div className="product__caption-description">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ))):(
          <div>
            <p>{'No se encontraron Productos para tu busqueda :('}</p>
          </div>
        )}
      </div>
    </div>
  );
};
