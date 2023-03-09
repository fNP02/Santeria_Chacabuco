import React from "react";
import { useValidate } from "../../store/Validar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import jwtDecode from "jwt-decode";

export const LogIn = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : undefined);
  const navigate = useNavigate()



  useEffect(() => {

    if (token != undefined) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const tokenExpiration = decodedToken?.exp;
      if (tokenExpiration < currentTime) {
        console.log("El token ha expirado");
        localStorage.removeItem("token")
      } else {
        console.log("El token es válido");
        navigate("/admin")
      }
    }
  }, [token]);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { validateUser, validateToken } = useValidate();

  const handleEntrar = async(e) => {
    e.preventDefault();
    await validateUser(email, pass)
    setToken(localStorage.getItem("token") ? localStorage.getItem("token") : undefined)
  };

  const handleProbar = () => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : tokenInvalido;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const tokenExpiration = decodedToken.exp;
    if (tokenExpiration < currentTime) {
      console.log("El token ha expirado");
    } else {
      console.log("El token es válido");
    }
  };

  return (
    <div>
      <Link data-active="index" to="/">
        Volver
      </Link>
      <form action="">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <hr />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={pass}
        />
        <hr />
        <button onClick={handleEntrar}>Entrar</button>
      </form>
      <button onClick={handleProbar}> probar</button>
    </div>
  );
};
