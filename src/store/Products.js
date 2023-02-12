import { create } from "zustand";

export const useProducts = create((set,get) => ({

    posts:[],

    getPosts: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await res.json();
        //console.log(posts);
        set((state) => ({
          ...state,
          posts: posts, // es lo mismo que simplemente posts
        }));
      },


}))