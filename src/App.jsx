import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import ComoComprarPAGE from "./pages/ComoComprarPAGE";
import { Productos } from "./pages/Productos";
import { LaEmpresaPAGE } from "./pages/LaEmpresaPAGE";
import { ContactoPAGE } from "./pages/ContactoPAGE";
import { Card } from "./components/Productos/Card";
import { Admin } from "./components/Admin/Admin";
import { LogIn } from "./components/Admin/LogIn";
import { CategoriesAdmin } from "./components/Admin/CategoriesAdmin";
import { AttributesAdmin } from "./components/Admin/AttributesAdmin";


import { useEffect} from "react";
import { useProducts } from "./store/Products";
import { useValidate } from "./store/Validar";
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
        <Route path="/como_comprar" element={<ComoComprarPAGE />} />
        <Route path="/la_empresa" element={<LaEmpresaPAGE />} />
        <Route path="/contacto" element={<ContactoPAGE />} />

        {/* Admin */}
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="/admin/attributes" element={<AttributesAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
