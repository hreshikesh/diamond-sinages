import { Routes, Route } from "react-router-dom";

import Preloader from "./components/common/Preloader";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
function App() {
  return (
    <>
      <Preloader />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;