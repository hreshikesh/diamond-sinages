import { Routes, Route } from "react-router-dom";

import Preloader from "./components/common/Preloader";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Facilities from "./pages/Facilities";
import ContactPage from "./pages/Contact";
function App() {
  return (
    <>
      <Preloader />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/products" element={<Product/>}/>
          <Route path="/facilities" element={<Facilities/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;