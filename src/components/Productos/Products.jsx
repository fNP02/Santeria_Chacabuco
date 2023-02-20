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

  useEffect(() => {  //con cambio en arreglo de productos, actualiza todos los productos
    setProducts(productsAll);
  }, [productsAll]);

  useEffect(() => {  
    actualizarResultados(products);
  }, [products]);

  // useEffect(() => {
  //   async function validarYllamar() {
  //     await validateToken();
  //     await getAllProducts();
  //     await getCategories();
  //     //await setCategories();
  //     const productsString = localStorage.getItem("productsLocal");
  //     const productsLoc = JSON.parse(productsString);
  //     // await setAllProducts()
  //     setProducts(productsLoc);
  //     await actualizarResultados(products);
  //   }
  //   validarYllamar();
  // }, []);

  useEffect(() => {
    actualizarResultados(products);
  }, [products]);


  // useEffect(() => {
  //   async function cargar() {
  //     const productsString = localStorage.getItem("productsLocal");
  //     const productsLoc = JSON.parse(productsString);
  //     // await setAllProducts()
  //     await setProductsAll(productsLoc);
  //     await setProducts(productsLoc);
  //     console.log("se ejecuto");
  //   }
  //   cargar();
  // }, []);

  // useEffect(() => {
  //   let pp = localStorage.getItem("productsLocal")
  //     ? JSON.parse(localStorage.getItem("productsLocal"))
  //     : productsAll;
  //     setPosts(pp)
  //   // actualizarResultados(pp);
  //   // setProducts(pp);
  //   console.log(posts);
  // }, []);

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
    let resultadoXCat = productsAll.filter((elemento) => {
      // const normalizedTitle = elemento.title.toLowerCase().normalize("NFD").replace(/\s+/g, '');
      // const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/\s+/g, '');
      const normalizedTitle = elemento.categoryId._id;
      const normalizedSearchTerm = catId;
      // return normalizedTitle.includes(normalizedSearchTerm);
      return normalizedTitle == normalizedSearchTerm;
    });
    setProducts(resultadoXCat);
    //actualizarResultados(resultadoXCat);
    //console.log(resultsFound);

    // actualizarResultados(resultadoXCat);
  };

  const handleMostrarTodos = () => {
    setProducts(productsAll);
  };

  if (!products.length) {
    return "cargando";
  }

  // if (loading) {
  //   return "cargando";
  // }

  console.log(resultsFound);

  return (
    <div className="productsPage">
      <div className="productsCategories">
        <h3>categorias</h3>
        <button onClick={handleMostrarTodos}>Mostrar Todos</button>
        {categories.map((cat) => (
          <div key={cat._id} className="categories">
            <button onClick={() => handleXCat(cat._id)}>
              <h3>{cat.name}</h3>
            </button>
          </div>
        ))}

        <button onClick={handleLocal}>mostrar desde local</button>
        <button onClick={handleDos}>mostrar desde products</button>
        <button onClick={handleBusqueda}>mostrar desde busqueda</button>
      </div>
      <div className="productsContainer">
        {/* {resultsFound.length > 0 ? (
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
          ))
        ) : (
          <div>
            <p>{"No se encontraron Productos para tu busqueda :("}</p>
          </div>
        )} */}
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
                    alt=""
                    onClick={() => handleClickProduct(product._id)}
                  />
                </div>
              </Link>
              <div className="product__caption">
                <p className="product__caption-monto">
                  <span className="monto">
                    {
                      showVariants(product.variants)
                      // product.variants.forEach((variante, index) => {
                      //   if(variante.price){
                      //     if(index == 0){
                      //       <span>variante.price</span>
                      //     }else{
                      //       return ' - ' + variante.price
                      //     }
                      //   }
                      // })
                    }
                  </span>

                  {/* <span className="monto">{product.variants[0] ? product.variants[0].price ? '$' + product.variants[0].price : "" :  ""}  </span> */}
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
