import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import unidecode from 'unidecode';

import prueba from "../../JSONprueba.json";
import { useProducts } from "../../store/Products";


import { useResults } from "../../store/Busqueda";

export const Search = () => {
  const { productsAll, products } = useProducts();
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const { resultsFound, actualizarResultados, busquedaActiva, activate } =
    useResults();

  //para ver cuando esta vacio o lleno
  const [inputtt, setInputtt] = useState("");

  useEffect(() => {
    actualizarResultados(productsAll);
  }, []);

  // useEffect(() => {
  //   if (inputtt.trim().length === 0) {
  //     activate(false);
  //     //console.log("El campo de entrada está vacío.");
  //   } else {
  //     activate(true);
  //     //console.log("El campo de entrada NO está vacío.");
  //   }
  //   //console.log(busquedaActiva);
  // }, [inputtt]);

  const handleChange = (e) => {
    setInputtt(e.target.value);
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim().length === 0) {
      activate(false);
    } else {
      activate(true);
    }
    console.log(busquedaActiva);
  };

  const filtrar = (searchTerm) => {
    let resultadoBusqueda = products.filter((elemento) => {
      // const normalizedTitle = elemento.title.toLowerCase().normalize("NFD").replace(/\s+/g, '');
      // const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/\s+/g, '');
      const normalizedTitle = unidecode(elemento.title.toLowerCase().replace(/\s+/g, ''));
    const normalizedSearchTerm = unidecode(searchTerm.toLowerCase().replace(/\s+/g, ''));
      // return normalizedTitle.includes(normalizedSearchTerm);
      return normalizedTitle.indexOf(normalizedSearchTerm) !== -1;
    });
    actualizarResultados(resultadoBusqueda);
  };

  return (
    <div className="div-searchProducts">
      <input
        className="input"
        type="text"
        name=""
        id=""
        placeholder="Buscar"
        onChange={handleChange}
        value={inputtt}
      />
      <button className="button">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};
