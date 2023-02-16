import { create } from "zustand";

export const useResults = create((set, get) => ({
  resultsFound: [],
  busquedaActiva: false,

  actualizarResultados: (value) => {
    //console.log(value);
    set((state) => ({
      resultsFound: value,
    }));
  },

  activate: (value) => {
    //console.log(value);
    set((state) => ({
      busquedaActiva: value,
    }));
  },

}));
