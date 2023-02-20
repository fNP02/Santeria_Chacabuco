import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import ComoComprar from "./pages/ComoComprar";
import { Productos } from "./pages/Productos";
import { LaEmpresa } from "./pages/LaEmpresa";
import { Contacto } from "./pages/Contacto";
import { Card } from "./components/Productos/Card";
import { Admin } from "./components/Admin/Admin";



import { useEffect} from "react";
import { useProducts } from "./store/Products";
import { useValidate } from "./store/Vaidar";
import { useResults } from "./store/Busqueda"; // para ver si mostrar busqueda o productos







function App() {

  const { products, productsAll } = useProducts();
  const { categories } = useProducts();
  const { getAllProducts, setProductsAll, setProducts, getCategories } = useProducts();
  const { validateToken } = useValidate();
  const { actualizarResultados } = useResults();

  // useEffect(() => {
  //   async function validarYllamar() {
  //     await validateToken();
  //     await getAllProducts();
  //     await getCategories();
  //     //await setCategories();
  //     const productsString = localStorage.getItem("productsLocal");
  //     const productsLoc = JSON.parse(productsString);
  //     // await setAllProducts()
  //     await setProductsAll(productsLoc);
  //     await setProducts(productsLoc);
  //     await actualizarResultados(productsAll);
  //   }
  //   validarYllamar();
  // }, []);

  useEffect(() => {
    // const alreadyExecuted = localStorage.getItem("alreadyExecuted");  

    // if(!alreadyExecuted) {
      console.log("Ejecutando el efecto secundario...");
      localStorage.setItem("alreadyExecuted", true);
      async function validarYllamar() {
        await getAllProducts();
        await getCategories();
        //await setCategories();
        const productsString = localStorage.getItem("productsLocal");
        const productsLoc = JSON.parse(productsString);
        // await setAllProducts()
        await setProductsAll(productsLoc);
        let pp = productsString ? JSON.parse(productsString) : productsAll;
        await setProducts(pp);

      }
      validarYllamar();

    // }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/productById/:productId" element={<Card />} />
        <Route path="/como_comprar" element={<ComoComprar />} />
        <Route path="/la_empresa" element={<LaEmpresa />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
