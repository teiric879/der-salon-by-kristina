import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Salon from '@/components/sections/Salon';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Experience from '@/components/sections/Experience';
import Team from '@/components/sections/Team';
import Prices from '@/components/sections/Prices';
import Reviews from '@/components/sections/Reviews';
import Vouchers from '@/components/sections/Vouchers';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';
import StickyBook from '@/components/StickyBook';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Salon />
        <Services />
        <Gallery />
        <Experience />
        <Team />
        <Prices />
        <Reviews />
        <Vouchers />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <StickyBook />
    </>
  );
}
