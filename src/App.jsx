import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import AppRoutes from "./routes.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import Particles from "./components/Particles/Particles.jsx";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </div>
  );
}

export default App;
