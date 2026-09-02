import ScrollToTop from "../components/common/ScrollToTop";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navigation/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}