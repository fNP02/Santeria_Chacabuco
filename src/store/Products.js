import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL

export const useProducts = create((set, get) => ({
  productsAll: [],
  products: [],
  categories: [],
  attributes:[],

  getAllProducts: async () => {
    const token = localStorage.getItem("token");
    const prodsTraidos = await fetch(
      `${API_URL}/productos?page=1&limit=10&titulo=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      const data = await prodsTraidos.json();
      //setProductosTodos(data.data);
      let productsD = await data.data;

      localStorage.setItem("productsLocal", JSON.stringify(productsD));

      //ordeno y pongo etiquetas a objetos
      const ordenados = await productsD.reduce((resultado, objeto) => {
        // Buscamos si el arreglo de la categoría ya existe en el resultado
        const arregloCategoria = resultado.find(
          (arr) => arr[0].categoryId._id === objeto.categoryId._id
        );

        if (arregloCategoria) {
          // Si ya existe, agregamos el objeto al arreglo de la categoría correspondiente
          arregloCategoria.push(objeto);
        } else {
          // Si no existe, creamos un nuevo arreglo para la categoría y lo agregamos al resultado
          resultado.push([objeto]);
        }
        return resultado;
      }, []);
      ordenados.forEach((productosXCat) => {
        let nombreCategoria = productosXCat[0].categoryId.name;
        productosXCat.unshift(nombreCategoria);
      });

      console.log("productos cargados");
      localStorage.setItem("productsLocalOrdenados", JSON.stringify(ordenados));
      //console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  },

  setProductsAll: (newProducts) => set({ productsAll: newProducts }),

  setProducts: (newProducts) => set({ products: newProducts }),

  getCategories: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/categorias`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    const data = await response.json();
    const catsId = data.data;
    set({ categories: catsId });
  },

  getAttributes: async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/atributos`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    const data = await response.json();
    const attrId = data.data;
    let atributosPorNombre = attrId.reduce((resultado, atributo) => {
      let nombre = atributo.type.name;
      if (!resultado[nombre]) {
        resultado[nombre] = [];
      }
      resultado[nombre].push(atributo);
      return resultado;
    }, {});
    
    set({ attributes: Object.entries(atributosPorNombre)});
    //console.log(atributosPorNombre)
  },

  makeAttributesTypes: async (atributoType) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/atributostypes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(atributoType)
      }
    );
    const data = await response.json();
    const attrId = data.data;
    return attrId
  },

  newAttributeValue: async (valuesToAdd) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/atributos`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(valuesToAdd)
      }
    );
    try {
      const data = await response.json();
      if (!response.ok) {
        //codigos http 400 y 500
        const errorMessage = data.data.message;
        if (errorMessage == "FALTA LA DATA DEL PAYLOAD") {
        }
        console.log(errorMessage);
      } else {
        console.log(data.data._id);

      }
    } catch (error) {
      console.log(error);
    }
    // const data = await response.json();
    // const attrId = data.data;
    // return attrId
  },

  deleteAttributeValue: async (valuesToDelete) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/atributos`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(valuesToDelete)
      }
    );
    try {
      const data = await response.json();
      if (!response.ok) {
        //codigos http 400 y 500
        const errorMessage = data.data.message;
        if (errorMessage == "FALTA LA DATA DEL PAYLOAD") {
        }
        console.log(errorMessage);
      } else {
        console.log(data.data._id);

      }
    } catch (error) {
      console.log(error);
    }
    // const data = await response.json();
    // const attrId = data.data;
    // return attrId
  },

  setAttributes: (newAttributes) => set({ attributes: newAttributes }),

  // setCategories: (newCategories) => set({ categories: newCategories })

  // setAllProducts: () => {
  //   // const prodString = localStorage.getItem("products");
  //   // prods = JSON.parse(prodString);
  //   set((state) => ({
  //     products: JSON.parse(localStorage.getItem("productsLocal")),
  //   }));
  //   console.log('productos recibidos');
  // },
  makeProduct: async (newProduct) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/productos`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
      }
    );
    try {
      const data = await response.json();
      if (!response.ok) {
        //codigos http 400 y 500
        const errorMessage = data.data.message;
        if (errorMessage == "FALTA LA DATA DEL PAYLOAD") {
        }
        console.log(errorMessage);
      } else {
        console.log(data.data._id);

      }
    } catch (error) {
      console.log(error);
    }
  },

  makeCategory: async (newProduct) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/categorias`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
      }
    );
    try {
      const data = await response.json();
      if (!response.ok) {
        //codigos http 400 y 500
        const errorMessage = data.data.message;
        if (errorMessage == "FALTA LA DATA DEL PAYLOAD") {
        }
        console.log(errorMessage);
      } else {
        console.log(data.data._id);

      }
    } catch (error) {
      console.log(error);
    }
  },

}));
