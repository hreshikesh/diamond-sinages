import { Routes, Route } from "react-router-dom";

import Preloader from "./components/common/Preloader";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Facilities from "./pages/Facilities";
import ContactPage from "./pages/Contact";
import AutomobileSignsPage from "./pages/AutomobileSignsPage";
import ShortTimeProjectsPage from "./pages/ShortTimeProjectsPage";
import FurnitureFixturePage from "./pages/FurnitureFixturePage";
function App() {
  return (
    <>
      <Preloader />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/automobilesigns" element={<AutomobileSignsPage />} />
          <Route path="/short-time-projects" element={<ShortTimeProjectsPage />} />
           <Route path="/furniture-fix" element={<FurnitureFixturePage />} />
        </Routes>

      </MainLayout>
    </>
  );
}

export default App;