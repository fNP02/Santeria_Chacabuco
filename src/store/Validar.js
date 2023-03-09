import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL


const dato = JSON.stringify({
  name: "rosa",
  color: "#FFC0CB",
});

export const useValidate = create((set) => ({
  crearColor: async () => {
    const tk = await fetch(
      `${API_URL}/colores`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dato,
      }
    );
    console.log(tk);
  },

  // validateUser: async (email,pass) => {
  //     const body = {
  //       email: email,
  //       password: pass
  //     }
  //     const tk = await fetch("https://santeriachacabuco1.up.railway.app/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body)

  //     })
  //     try {
  //       if (!tk.ok) {
  //         const errorData = await tk.json();
  //         const errorMessage = errorData.message;
  //         if(errorMessage == "FALTA LA DATA DEL PAYLOAD"){
  //         }
  //       }
  //       const reader = tk.body.getReader();
  //       let data = "";
  //       return reader.read().then(function processResult(result) {
  //         if (result.done) {
  //           const token = JSON.parse(data).data.token;
  //           localStorage.setItem("token", token);
  //           return token;
  //         }
  //         data += new TextDecoder().decode(result.value);
  //         return reader.read().then(processResult);
  //       });

  //     } catch (e) {
  //         console.log(e);
  //     }
  //   },

  validateUser: async (email, password) => {
    const body = { email, password };
    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      const token = (await data?.data?.token) ?? "";
      if (token) {
        localStorage.setItem("token", token);
        console.log(token);
        return {
          
        };
      } else {
        console.log("Error, usuario invalido");
        // throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
