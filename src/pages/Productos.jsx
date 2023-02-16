import { Products } from "../components/Productos/Products"
import { Footer } from '../components/Home/Footer/Footer';
import { Search } from "../components/Productos/Search"
import Header from "../components/Home/Header/Header";

export const Productos = () => {
  return (
    <>
      <Header/>
      <Search/>
      <Products/>
      <Footer/>
    </>
  )
}
