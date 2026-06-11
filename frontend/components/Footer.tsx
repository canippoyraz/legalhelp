import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link href="/" className="nav__logo">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#1a56db" />
              <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Legal<span>Help</span>
          </Link>
          <p>Professional legal agreements for everyone.</p>
        </div>
        <div className="footer__links-group">
          <strong>Product</strong>
          <Link href="/builder">Agreement Builder</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#how">How It Works</Link>
        </div>
        <div className="footer__links-group">
          <strong>Company</strong>
          <Link href="/#about">About</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="footer__links-group">
          <strong>Legal</strong>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} LegalHelp. All rights reserved.</p>
          <p>Not a law firm. Documents are templates only and do not constitute legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
