import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ThreeBackground from "@/components/ui/ThreeBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Treatments from "@/components/sections/Treatments";
import Bonos from "@/components/sections/Bonos";
import Products from "@/components/sections/Products";
import Contact from "@/components/sections/Contact";
import MapAndReviews from "@/components/sections/MapAndReviews";
import Footer from "@/components/ui/Footer";
import BodyZones from "@/components/sections/BodyZones";

export default function Home() {
  return (
    <>
      {/* Canvas 3D fijo en el fondo — reacciona al scroll */}
      <ThreeBackground />

      {/* Cursor personalizado */}
      <CustomCursor />

      {/* Navbar fijo arriba */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Treatments />
        <Bonos />
        <BodyZones />
        <Products />
        <Contact />
      </main>
      <MapAndReviews />
      <Footer />
    </>
  );
}
