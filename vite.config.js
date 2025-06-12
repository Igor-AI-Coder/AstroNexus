import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/AstroNexus/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        produtos: "src/pages/produtos.html",
        carrinho: "src/pages/carrinho.html",
        galeria: "src/pages/galeria.html",
        planetas: "src/pages/planetas.html",
        fatosCuriosos: "src/pages/fatos-curiosos.html",
        404: "src/pages/404.html",
        // adicione outras páginas aqui
      },
    },
  },
  plugins: [tailwindcss()],
});
