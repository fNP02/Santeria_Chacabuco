import { create, useStore } from "zustand";

const dato = JSON.stringify({
    email: "santeriachacabuco@gmail.com",
    password: "chacabuco0202",
  });

export const useValidate = create((set) => ({

    validateToken: async () => {
        const tk = await fetch("https://santeriachacabuco.up.railway.app/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dato,
        })
        try {
            const reader = tk.body.getReader();
          let data = "";
          return reader.read().then(function processResult(result) {
            if (result.done) {
              const token = JSON.parse(data).data.token; // Obtener el token de la respuesta
              //console.log(JSON.parse(data).data.token);
              localStorage.setItem("token", token);
              // Hacer algo con el token
              return token;
            }
            data += new TextDecoder().decode(result.value);
            return reader.read().then(processResult);
          });

          
        } catch (e) {
            console.log(e);
            
        }
        //   .then((response) => {
        //     const reader = response.body.getReader();
        //     let data = "";
        //     return reader.read().then(function processResult(result) {
        //       if (result.done) {
        //         const token = JSON.parse(data).data.token; // Obtener el token de la respuesta
        //         //console.log(JSON.parse(data).data.token);
        //         localStorage.setItem("token", token);
        //         // Hacer algo con el token
        //         return token;
        //       }
        //       data += new TextDecoder().decode(result.value);
        //       return reader.read().then(processResult);
        //     });
        //   })
        //   .catch((error) => console.error(error));
        // //console.log(localStorage.getItem("token"));
      },
  
    
  }));
  