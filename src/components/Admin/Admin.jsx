import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { HeaderAdmin } from "./HeaderAdmin";
import { ProductsTable } from "./ProductsTable";

import { useProducts } from "../../store/Products";

//modal
import Modal from "react-modal";
Modal.setAppElement("#root");

export const Admin = () => {
  ////// para modal
  const customStyles = {
    content: {
      height: "500px",
      width: "800px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };



  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : undefined
  );
  const navigate = useNavigate();

  const { categories, makeProduct, productsAll, setProducts } = useProducts();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  //variantes
  const [newVariants, setNewVariants] = useState([
    {
      colorsId: ["63ec5477d4c289b4290ced12"],
      sizesId: ["63ec5435d4c289b4290ced02"],
      imagesId: ["63ec5420d4c289b4290cecfb"],
      price: 3500,
    },
  ]);

  useEffect(() => {
    if (token == undefined) {
      navigate("/logIn");
      alert("sin usuario");
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const tokenExpiration = decodedToken?.exp;
      if (tokenExpiration < currentTime) {
        console.log("El token ha expirado");
        localStorage.removeItem("token");
        navigate("/logIn");
      } else {
        console.log("El token es válido");
      }
    }
  }, [token]);

  useEffect(() => {
    //con cambio en arreglo de productos, actualiza todos los productos
    setProducts(productsAll);
  }, [productsAll]);

  const handleMostrarCats = () => {
    console.log(categories);
  };

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleNewDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const handleNewProduct = () => {
    const producto = {
      title: newTitle,
      description: newDescription,
      categoryId: categoriaSeleccionada._id,
    };
    //console.log(JSON.stringify(producto));
    makeProduct(producto);
  };

  return (
    <div>
      <HeaderAdmin />
      <h1>pagina de admin</h1>
      <div>
        <h2>Crear Producto</h2>

        <select
          value={categoriaSeleccionada?._id}
          onChange={(e) => {
            setCategoriaSeleccionada(
              categories.find((elemento) => elemento._id == e.target.value)
            );
            console.log(categoriaSeleccionada);
          }}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((elemento) => (
            <option key={elemento._id} value={elemento._id}>
              {elemento.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre del producto"
          onChange={handleNewTitle}
          required="true"
        />
        <input
          type="text"
          placeholder="Descripcion del producto"
          onChange={handleNewDescription}
        />
        <hr />
        <h2>LIsta de variantes:</h2>
        {newVariants.map((variant) => (
          <div key={variant._id}>
            <span>{variant.name}</span>
          </div>
        ))}
        <hr />
        <hr />
        <br />
        <hr />
      
        <button onClick={openModal}>+ Agregar variante</button>
        <hr />
        <button onClick={handleNewProduct}>{"> CREAR PRODUCTO"}</button>
        <Modal
          isOpen={showModal}
          //onRequestClose={closeModal}  //para que se cierre tocando afuera de modal
          style={customStyles}
          contentLabel="Ejemplo Modal"
        >
          <>
            <select name="" id="">
              <option value="">Seleccione un atributo</option>
              {newVariants.map((variant) => (
                <option key={variant._id} value={variant._id}>
                  {variant.name}
                </option>
              ))}
            </select>
            

            <button>AGREGAR</button>
          </>
          <hr />
          <button onClick={closeModal}>Cancelar</button>
        </Modal>
      </div>

      <hr />
      <ProductsTable productsAll={productsAll} />
    </div>
  );
};
