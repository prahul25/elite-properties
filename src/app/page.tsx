import FeaturedProperties from "./components/landingPageComponent/FeaturedProperties";
import Footer from "./components/landingPageComponent/Footer";
import Hero from "./components/landingPageComponent/Hero";
import Navbar from "./components/landingPageComponent/Navbar";
import Services from "./components/landingPageComponent/Services";
import WhyChooseUs from "./components/landingPageComponent/WhyChooseUs";


export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Services/>
    <FeaturedProperties/>
    <WhyChooseUs/>
    <Footer/>
    </>
  );
}