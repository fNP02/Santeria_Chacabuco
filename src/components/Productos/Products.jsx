import React from "react";
import { Card } from "./Card";
import { useProducts } from "../../store/Products";
import { useValidate } from "../../store/Vaidar";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useResults } from "../../store/Busqueda"; // para ver si mostrar busqueda o productos
import { render } from "react-dom";

export const Products = () => {
  const { products, productsAll } = useProducts();
  const { categories } = useProducts();
  const { setProducts } = useProducts();

  //para usar resultados de busqueda
  const { resultsFound, actualizarResultados } = useResults();

  useEffect(() => {
    //con cambio en arreglo de productos, actualiza todos los productos
    setProducts(productsAll);
  }, [productsAll]);

  useEffect(() => {
    actualizarResultados(products);
  }, [products]);

  function handleClickProduct(id) {
    console.log(id);
  }

  function handleLocal(id) {
    console.log(JSON.parse(localStorage.getItem("productsLocal")));
  }
  function handleDos(id) {
    console.log(products);
  }
  function handleBusqueda(id) {
    console.log(resultsFound);
  }

  function showVariants(variantes) {
    //funcion para mostrar Desde... cuando hay mas de un precio
    let variantesString = "";

    if (variantes.length > 1) {
      variantes.forEach((variante, index) => {
        if (variante.price != "" && variante.price != null) {
          variantesString = "Desde $" + JSON.stringify(variante.price);
        }
      });
    } else {
      variantes.forEach((variante, index) => {
        if (variante.price != "" && variante.price != null) {
          variantesString = "$" + JSON.stringify(variante.price);
        }
      });
    }
    return variantesString;
  }

  const handleXCat = (catId) => {
    //funcion para mostrar productos por categorias al tocar de barra lateral
    let resultadoXCat = productsAll.filter((elemento) => {
      const normalizedTitle = elemento.categoryId._id;
      const normalizedSearchTerm = catId;
      return normalizedTitle == normalizedSearchTerm;
    });
    setProducts(resultadoXCat);
    return resultadoXCat
  };

  const handleMostrarTodos = () => {
    setProducts(productsAll);
    ultimoTocado.classList.remove("activeCaregory");
  };

  const [ultimoTocado, setUltimoTocado] = useState(null);  //para cambiar estilo a categoria activa
  function categoryClick(e) {
    // Obtener el elemento que se tocó
    const elementoTocado = e.target.parentNode;
    // Cambiar el color del último elemento tocado
    if (ultimoTocado) {
      ultimoTocado.classList.remove("activeCaregory");
    }
    elementoTocado.classList.add("activeCaregory");
    setUltimoTocado(elementoTocado);
  }

  if (!products.length) {
    //mientras no exista arreglo, mostrará cargando
    return "cargando...";
  }
  return (
    <div className="productsPage">
      <aside className="productsCategories">
        <h3>categorias</h3>
        <button onClick={handleMostrarTodos}>Mostrar Todos</button>
        <div className="categories" onClick={categoryClick}>
          {categories.map((cat) => (
            <div key={cat._id} className="category">
              <button onClick={() => handleXCat(cat._id)}>
              {cat.name}
              {console.log(cat)}
              <span>{cat.length}</span>
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleLocal}>mostrar desde local</button>
        <button onClick={handleDos}>mostrar desde products</button>
        <button onClick={handleBusqueda}>mostrar desde busqueda</button>
      </aside>
      <div className="productsContainer">
        {resultsFound.length ? (
          resultsFound.map((product) => (
            <div key={product._id} className="product">
              {
                console.log(product.variants[0]?.imagesId[0]?.url ?? "no ta") //? evalua y devuelve si existe   ?? devuelve valor de la izq si existe, si no el de la derecha
              }
              <Link
                data-active="productById"
                to={`/productos/productById/${product._id}`}
              >
                <div className="product__img">
                  <img
                    className="img"
                    src={
                      product.variants[0]?.imagesId[0]?.url ??
                      "https://ss-static-01.esmsv.com/id/157859/productos/obtenerimagen/?id=334&useDensity=true&width=1920&height=1080&tipoEscala=fit"
                    }
                    alt={product.title}
                    onClick={() => handleClickProduct(product._id)}
                  />
                </div>
              </Link>
              <div className="product__caption">
                <p className="product__caption-monto">
                  <span className="monto">
                    {showVariants(product.variants)}
                  </span>
                </p>
                <header>
                  <h3
                    className="product__caption-title"
                    onClick={() => handleClickProduct(product._id)}
                  >
                    {product.title}
                  </h3>
                </header>
                <div className="product__caption-description">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>{"No se encontraron Productos para tu busqueda :("}</p>
          </div>
        )}
      </div>
    </div>
  );
};
