'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <div className="container nav__inner">
        <Link href="/" className="nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#1a56db" />
            <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Legal<span>Help</span>
        </Link>
        <nav>
          <ul className="nav__links">
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#how">How It Works</Link></li>
            <li><Link href="/#testimonials">Testimonials</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/builder" className="btn btn--primary">Create Agreement</Link></li>
          </ul>
        </nav>
        <button className="nav__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-nav">&#9776;</button>
      </div>
      <div id="mobile-nav" className={`nav__mobile${menuOpen ? ' open' : ''}`}>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link href="/#how" onClick={() => setMenuOpen(false)}>How It Works</Link>
        <Link href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
        <Link href="/builder" className="btn btn--primary" onClick={() => setMenuOpen(false)}>Create Agreement</Link>
      </div>
    </header>
  );
}
