import { Navbar, Footer } from '@shared/index';
import { HeroBanner } from '@modules/hero';
import { CatalogSection } from '@modules/catalog';
import { HowToBuySection } from '@modules/how-to-buy';
import { CartProvider, CartSidebar } from '@modules/cart';

export function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <HeroBanner />
        <CatalogSection />
        <HowToBuySection />
      </main>
      <Footer />
      <CartSidebar />
    </CartProvider>
  );
}

export default App;
