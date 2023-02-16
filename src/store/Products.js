import { create } from "zustand";

export const useProducts = create((set, get) => ({
  posts: [],

  getPosts: async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await res.json();
      //console.log(posts);
      set((state) => ({
        ...state,
        posts: posts, // es lo mismo que simplemente posts
      }));
    } catch {
      console.log("Oops, algo salió mal con tu api");
    }
  },
}));
