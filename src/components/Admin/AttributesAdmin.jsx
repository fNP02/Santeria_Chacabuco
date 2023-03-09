import { HeaderAdmin } from "./HeaderAdmin";
import { useProducts } from "../../store/Products";
import { useEffect, useState } from "react";

//modal
import Modal from "react-modal";
Modal.setAppElement("#root");

let esColor = false; //para en Editar, saber si es un color o no

export const AttributesAdmin = () => {
  const {
    attributes,
    getAttributes,
    makeAttributesTypes,
    newAttributeValue,
    deleteAttributeValue,
  } = useProducts();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState("");
  const [typeSelected, setTypeSelected] = useState("");
  const [isButtonAttributeDisabled, setIsButtonAttributeDisabled] =
    useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [newAttribute, setNewAttribute] = useState([]);

  useEffect(() => {
    getAttributes();
  }, []);

  useEffect(() => {
    getAttributes();
  }, [attributes]);

  //modal
  const customStyles = {
    content: {
      height: "300px",
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
  const [showModalEdit, setShowModalEdit] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openModalEdit = () => {
    setShowModalEdit(true);
  };
  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const [Editando, setEditando] = useState([]);
  const [valoresAgregados, setValoresAgregados] = useState([]);
  const [valoresEliminados, setValoresEliminados] = useState([]);
  const [nuevoValor, setNuevoValor] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");

  const handleNewName = (e) => {
    setName(e.target.value);
  };
  const handleNewDescription = (e) => {
    setNewDescription(e.target.value);
  };
  const handleNewType = (e) => {
    setNewType(e.target.value);
  };
  const handleNewAttribute = () => {
    if (typeSelected === "") {
      setShowErrorMessage(true); // mostrar el mensaje de error si el usuario no ha seleccionado una opción válida
    } else {
      setShowErrorMessage(false); // ocultar el mensaje de error si el usuario ha seleccionado una opción válida
      // aquí va el código que se ejecuta cuando se hace clic en el botón "Continuar"
      const atributoType = {
        name: newName,
        visualizationType: newType,
      };
      const atributoTypeCreado = makeAttributesTypes(atributoType);
      newAttribute.map((att) => {
        let atributo = {
          value: att.value,
          description: att.description,
          type: atributoTypeCreado._id,
        };
      });

      console.log(JSON.stringify(atributo));
      closeModal();
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setTypeSelected(value);
    setIsButtonAttributeDisabled(value === "");
    setShowErrorMessage(false);
  };

  const handleAddValue = (e) => {
    e.preventDefault();
    let attribute = {
      value: newType,
      description: newDescription,
    };
    setNewAttribute([...newAttribute, attribute]);
  };

  const handleEditar = (id) => {
    const obj = attributes.find((item) => item[1][0].type._id === id);
    setEditando(obj);
    openModalEdit();
    esColor = obj[1][0].type.visualizationType == "Colores";
    console.log(esColor);
  };

  const handleAgregarValor = () => {
    if (nuevoValor.trim()) {
      setEditando([
        Editando[0],
        [...Editando[1], { value: nuevoValor, description: nuevoColor }],
      ]);

      if (esColor) {
        setValoresAgregados([
          ...valoresAgregados,
          {
            value: nuevoValor,
            description: nuevoColor,
            type: Editando[1][0].type._id,
          },
        ]);
      } else {
        setValoresAgregados([
          ...valoresAgregados,
          {
            value: nuevoValor,
            type: Editando[1][0].type._id,
          },
        ]);
      }
      console.log(valoresAgregados);

      setNuevoValor("");
      setNuevoColor("#000000");
    }
    console.log(Editando);
  };

  const handleBorrarValor = (index) => {
    const valores = [...Editando[1]];
    valores.splice(index, 1);
    setEditando([Editando[0], valores]);
    console.log(Editando[1][index]._id);

    setValoresEliminados([
      ...valoresEliminados,
      {
        _id: Editando[1][index]._id,
      },
    ]);

    console.log(valoresEliminados);
  };

  const handleGuardarCambios = () => {
    const valuesToAdd = { atributos: valoresAgregados };
    if (Array.isArray(valoresAgregados) && valoresAgregados.length > 0) {
      newAttributeValue(valuesToAdd);
    }
    const valuesToDelete = { atributos: valoresEliminados };
    if (Array.isArray(valoresEliminados) && valoresEliminados.length > 0) {
      deleteAttributeValue(valuesToDelete);
    }

    setValoresEliminados([]);
    setValoresAgregados([]);
    setShowModalEdit(false);
    getAttributes();
  };

  const handleCancelarEdit = () => {
    closeModalEdit();
    setValoresEliminados([]);
    setValoresAgregados([]);
  };
  // console.log(attributes);

  return (
    <div>
      <HeaderAdmin />

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Atributo</th>
            <th>Valores</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((att) => (
            <tr key={att[0]} style={{ textAlign: "center" }}>
              <td>{att[0]}</td>
              <td>
                {att[1].map((variedad, index) => {
                  if (variedad.type.visualizationType == "Colores") {
                    return (
                      <div
                        key={variedad.value}
                        style={{
                          backgroundColor: variedad.description,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginLeft: "10px",
                        }}
                      ></div>
                    );
                  }
                  if (index == att[1].length - 1) {
                    return <span key={index}>{`${variedad.value}`}</span>;
                  } else {
                    return <span key={index}>{`${variedad.value} - `}</span>;
                  }
                })}
              </td>
              <td>{att[1][0].type.visualizationType}</td>
              <td>
                <button onClick={() => handleEditar(att[1][0].type._id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={openModal}>Nuevo Atributo</button>
      {/* MODAL PARA CREAR */}
      <Modal
        isOpen={showModal}
        //onRequestClose={closeModal}  //para que se cierre tocando afuera de modal
        style={customStyles}
        contentLabel="Ejemplo Modal"
      >
        <>
          <input
            type="text"
            placeholder="Tipo de atributo"
            onChange={handleNewName}
            required={true}
          />

          <select onChange={handleSelectChange} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled >
              Como lo quiere ver?
            </option>
            <option value="colores">Colores</option>
            <option value="lista">Lista desplegable</option>
          </select>
          <hr />
          {newAttribute.length
            ? newAttribute.map((att) => (
                <span>
                  {att.value} - {att.description} /{" "}
                </span>
              ))
            : ""}
          <br />
          <hr />
          {typeSelected === "colores" && (
            <input
              type="color"
              placeholder="Descripcion"
              onChange={handleNewDescription}
              required={true}
            />
          )}

          <input
            type="text"
            placeholder="nuevo valor"
            onChange={handleNewType}
            required={true}
          />
          <button onClick={handleAddValue}>
            +Agregar o algo por el estilo
          </button>

          {showErrorMessage && (
            <p style={{ color: "red" }}>
              Por favor, seleccione una opción para continuar
            </p>
          )}

          <hr />
          <button
            onClick={handleNewAttribute}
            // disabled={isButtonAttributeDisabled}
          >
            CREAR
          </button>
        </>
        <hr />
        <button onClick={closeModal}>Cancelar</button>
      </Modal>

      {/* MODAL PARA EDITAR */}
      <Modal
        isOpen={showModalEdit}
        onRequestClose={closeModal} //para que se cierre tocando afuera de modal
        style={customStyles}
        contentLabel="Ejemplo Modal"
      >
        <>
          <h3>{Editando[0]}</h3>
          <div>
            {Editando[1] &&
              Editando[1].map((att, index) => (
                <div key={att.value}>
                  {Editando[1][0].type.visualizationType == "Colores" && (
                    <div
                      style={{
                        backgroundColor: att.description,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginLeft: "10px",
                      }}
                    ></div>
                  )}
                  <span>{att.value} </span>
                  <button onClick={() => handleBorrarValor(index)}>
                    ---Borrar
                  </button>
                </div>
              ))}

            <input
              type="text"
              placeholder="nuevo valor"
              onChange={(e) =>
                setNuevoValor(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1).toLocaleLowerCase()
                )
              }
              value={nuevoValor}
            />

            {/* Input para seleccionar color en caso de que sea de tipo colores */}
            {esColor && (
              <input
                type="color"
                name=""
                id=""
                onChange={(e) => setNuevoColor(e.target.value)}
                value={nuevoColor}
              />
            )}

            <button onClick={handleAgregarValor}> {"-> Agregar"}</button>
          </div>
        </>

        <hr />
        <button onClick={handleCancelarEdit}>Cancelar</button>
        <hr />
        <button onClick={handleGuardarCambios}>GUARDAR</button>
      </Modal>

      <hr />
    </div>
  );
};

/* Se ve bien? */
/* hola */
//si, correcto