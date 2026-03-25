import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Valores from "./components/Valores";
import Processo from "./components/Processo";
import Produtos from "./components/Produtos";
import Origens from "./components/Origens";
import ESG from "./components/ESG";
import CTAContato from "./components/CTAContato";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Sobre />
      <Valores />
      <Processo />
      <Produtos />
      <Origens />
      <ESG />
      <CTAContato />
      <Footer />
    </main>
  );
}
