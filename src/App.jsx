import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import AppRoutes from "./routes.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
