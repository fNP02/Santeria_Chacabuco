import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import prueba from "../../JSONprueba.json";

import { useResults } from "../../store/Busqueda";

export const Search = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const { resultsFound, actualizarResultados, busquedaActiva, activate } =
    useResults();

  //para ver cuando esta vacio o lleno
  const [inputtt, setInputtt] = useState("");

  useEffect(() => {
    actualizarResultados(prueba);
  }, []);

  useEffect(() => {
    if (inputtt.trim().length === 0) {
      activate(false);
      //console.log("El campo de entrada está vacío.");
    } else {
      activate(true);
      //console.log("El campo de entrada NO está vacío.");
    }
    //console.log(busquedaActiva);
  }, [inputtt]);

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

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = prueba.filter((elemento) => {
      if (
        elemento.title
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    actualizarResultados(resultadoBusqueda);
    //setResultados(resultadoBusqueda);
    //console.log(resultsFound);
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
