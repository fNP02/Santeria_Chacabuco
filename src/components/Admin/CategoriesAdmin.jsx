import { HeaderAdmin } from "./HeaderAdmin";
import { useProducts } from "../../store/Products";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const CategoriesAdmin = () => {
  const [categoriasAmostrar, setCategoriasAmostrar] = useState([]);
  const { categories, makeCategory, getCategories } = useProducts();
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    setCategoriasAmostrar(categories);
  }, [categories]);

  useEffect(() => {
    if (token == undefined) {
      navigate("/logIn");
      alert('sin usuario')
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

  const inputRef = useRef();
  console.log(categories);

  const [newCategory, setNewCategory] = useState("");
  const handleNewCategoryName = (e) => {
    setNewCategory(e.target.value);
  };
  const handleNewCategory = async () => {
    const category = {
      name: newCategory,
    };
    //console.log(JSON.stringify(producto));
    await makeCategory(category);
    getCategories();
    inputRef.current.value = "";
  };

  return (
    <div>
      <HeaderAdmin />
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="ingrese nombre de cat"
          onChange={handleNewCategoryName}
          ref={inputRef}
        />
        <button onClick={handleNewCategory}>CREAR CATEGORIA</button>
      </div>
      {categoriasAmostrar.map((cat) => (
        <div>
          <span>{cat.name}</span>
        </div>
      ))}
    </div>
  );
};
