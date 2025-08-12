import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import FatosCuriosos from "./pages/FatosCuriosos/FatosCuriosos.jsx";
import Galeria from "./pages/Galeria/Galeria.jsx";
import Produtos from "./pages/Produtos/Produtos.jsx";
import Carrinho from "./pages/Carrinho/Carrinho.jsx";
import Planetas from "./pages/Planetas/Planetas.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fatos-curiosos" element={<FatosCuriosos />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/planetas" element={<Planetas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
