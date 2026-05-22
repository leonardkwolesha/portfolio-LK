import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { href: '#home',     label: 'Home',     id: 'home'     },
  { href: '#about',    label: 'About',    id: 'about'    },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#stack',    label: 'Stack',    id: 'stack'    },
  { href: '#contact',  label: 'Contact',  id: 'contact'  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = NAV_LINKS.map(l => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Code-style gradient logo */}
        <a href="#home" className="nav-logo" onClick={close}>
          <span className="nav-logo-bracket">&lt;</span>
          LK
          <span className="nav-logo-bracket">/&gt;</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label, id }) => (
            <li key={id}>
              <a href={href} className={active === id ? 'active' : ''}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Icon-based hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <ul>
          {NAV_LINKS.map(({ href, label, id }) => (
            <li key={id}>
              <a href={href} className={active === id ? 'active' : ''} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
