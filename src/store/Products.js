import { create } from "zustand";

export const useProducts = create((set, get) => ({
  
  productsAll: [],
  products: [],
  categories: [],

  getAllProducts: async () => {
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
      "https://santeriachacabuco.up.railway.app/api/categorias",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    //console.log("...............");
    //console.log(data.data);
    //const catsId = data.data.map((arr) => arr._id);
    const catsId = data.data;
    //console.log(catsId);
    set({ categories: catsId });
  },

  // setCategories: (newCategories) => set({ categories: newCategories })

  // setAllProducts: () => {
  //   // const prodString = localStorage.getItem("products");
  //   // prods = JSON.parse(prodString);
  //   set((state) => ({
  //     products: JSON.parse(localStorage.getItem("productsLocal")),
  //   }));
  //   console.log('productos recibidos');
  // },
}));
