import { Link } from "react-router-dom";
import { useState } from "react";

export const Admin = () => {
  const dato = JSON.stringify({
    email: "santeriachacabuco@gmail.com",
    password: "chacabuco0202",
  });

  const [dataCats, setData] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTodos, setProductosTodos] = useState([]);
  const [ordenados, setOrdenados] = useState([]);

  const handleSubmit = async (e) => {
    fetch("https://santeriachacabuco.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dato,
    })
      .then((response) => {
        const reader = response.body.getReader();
        let data = "";
        return reader.read().then(function processResult(result) {
          if (result.done) {
            const token = JSON.parse(data).data.token; // Obtener el token de la respuesta
            console.log(JSON.parse(data).data.token);
            localStorage.setItem("token", token);
            // Hacer algo con el token
            return token;
          }
          data += new TextDecoder().decode(result.value);
          return reader.read().then(processResult);
        });
      })
      .catch((error) => console.error(error));
    console.log(localStorage.getItem("token"));
  };

  const handleProducts = async () => {
    const id = "63ec06b0aebd1f933c172f5d";
    const token = localStorage.getItem("token");
    const prodsTraidos = await fetch(
      `https://santeriachacabuco.up.railway.app/api/productos?page=1&limit=10&titulo=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      const data = await prodsTraidos.json();
      setProductosTodos(data.data);
      console.log(productosTodos);
    } catch (e) {
      console.log(e);
    }
    // let prods = data.data;
    // setProductosTodos(prods)
    // console.log(productosTodos);
  };

  const handleProductsxCats = async (cat) => {
    //devuelve un array por categoria
    const token = localStorage.getItem("token");
    let prods = [];
    const categoriaTemp = await fetch(
      `https://santeriachacabuco.up.railway.app/api/productos?page=1&limit=10&categoria=${cat}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      let data = await categoriaTemp.json();
      console.log(data.data);
      setProductos([...productos, data.data]);
    } catch (e) {
      console.log(e);
    }
    //.then((response) => response.json())
    // .then(async (data) => {
    //  prods = await data.data;
    //  setProductos(prods)
    // setProductos((prevState) =>
    //   prevState.concat(prods)
    // );
    //console.log(cat);
    //console.log('------------');
    // console.log(productos);
  };

  const handleCats = async () => {
    const id = "63ec06b0aebd1f933c172f5d";
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://santeriachacabuco.up.railway.app/api/categorias",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setData(data);
    const catsId = data.data.map((arr) => arr._id);
    setProductos([]);
    console.log(catsId);
    catsId.forEach((categoria) => {
      handleProductsxCats(categoria);
      //console.log("segundo log" + productos);
    });
    //console.log(productos)
    // cats.map((cat) => {
    //   console.log(handleProductsxCats(cat.name).lenght);
    // });
  };

  // localStorage.getItem('token')

  const handleOrdenar = () => {
    const ordenados = productosTodos.reduce((resultado, objeto) => {
      // Buscamos si el arreglo de la categoría ya existe en el resultado
      const arregloCategoria = resultado.find(arr => arr[0].categoryId._id === objeto.categoryId._id);
    
      if (arregloCategoria) {
        // Si ya existe, agregamos el objeto al arreglo de la categoría correspondiente
        arregloCategoria.push(objeto);
      } else {
        // Si no existe, creamos un nuevo arreglo para la categoría y lo agregamos al resultado
        resultado.push([objeto]);
      }
    
      return resultado;
    }, []);
  
    
    ordenados.forEach(productosXCat => {
      let nombreCategoria = productosXCat[0].categoryId.name
      productosXCat.unshift(nombreCategoria);
    });
    console.log(ordenados);
    setProductosTodos(ordenados)
  };

  const mostrar=()=>{
    const amostrar = productosTodos.filter(prod=>prod[0] == 'santos')
    console.log(amostrar);
  }
  
  return (
    <>
      <Link data-active="index" to="/">
        Volver
      </Link>
      <div>Admin</div>

      <input type="text" name="" id="" placeholder="email" />
      <input type="text" name="" id="" placeholder="pass" />
      <button onClick={handleSubmit}>Entrar</button>
      <hr />

      <button onClick={handleProducts}>Traer productos</button>
      <hr />
      <button onClick={handleCats}>Traer cats</button>

      <hr />
      <button
        onClick={() => {
          handleProductsxCats("63ed59cd56406598a0505679");
        }}
      >
        btn test
      </button>
      <hr />
      <button onClick={handleOrdenar}>ordenar</button>
      <hr />
      <button onClick={mostrar}>mostrar</button>
    </>
  );
};
