import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import TechTicker     from './components/TechTicker';
import About          from './components/About';
import Projects       from './components/Projects';
import Stack          from './components/Stack';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop      from './components/BackToTop';

const App = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <main>
      <Hero />
      <TechTicker />
      <About />
      <Projects />
      <Stack />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </>
);

export default App;
