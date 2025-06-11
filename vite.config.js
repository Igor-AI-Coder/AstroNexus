import { defineConfig } from "vite";

export default defineConfig({
  base: "/AstroNexus/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        produtos: "produtos.html",
        carrinho: "carrinho.html",
        fatosCuriosos: "fatos-curiosos.html",
        galeria: "galeria.html",
        planetas: "planetas.html",
        // adicione outras páginas aqui
      },
    },
  },
});
