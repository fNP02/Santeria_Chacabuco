import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import ComoComprar from "./pages/ComoComprar";
import { Productos } from "./pages/Productos";
import {LaEmpresa} from './pages/LaEmpresa'
import {Contacto} from './pages/Contacto'
import Header from "./components/Home/Header/Header";



function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/como_comprar" element={<ComoComprar/>} />
        <Route path="/la_empresa" element={<LaEmpresa/>} />
        <Route path="/contacto" element={<Contacto/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
