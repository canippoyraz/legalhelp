import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <div className="hero__badge">Trusted by 10,000+ professionals</div>
            <h1 className="hero__title">Legal Agreements,<br /><span>Done Right.</span></h1>
            <p className="hero__subtitle">LegalHelp empowers individuals and businesses to draft, customise, and sign professional legal agreements — without the complexity or the cost of a law firm.</p>
            <div className="hero__cta">
              <Link href="/builder" className="btn btn--primary btn--lg">Create a Sample Agreement</Link>
              <Link href="#how" className="btn btn--ghost btn--lg">See How It Works</Link>
            </div>
            <div className="hero__trust">
              <span>✓ Lawyer-reviewed templates</span>
              <span>✓ No account needed</span>
              <span>✓ Instant download</span>
            </div>
          </div>
          <div className="hero__visual">
            <div className="doc-card">
              <div className="doc-card__header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1a56db" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="#1a56db" strokeWidth="2"/></svg>
                <span>Non-Disclosure Agreement</span>
                <span className="doc-card__badge">Ready</span>
              </div>
              <div className="doc-card__lines">
                <div className="line line--full"></div>
                <div className="line line--full"></div>
                <div className="line line--3q"></div>
                <div className="line line--half"></div>
                <div className="line line--full"></div>
                <div className="line line--full"></div>
                <div className="line line--2q"></div>
              </div>
              <div className="doc-card__footer">
                <div className="sig-block"><div className="sig-line"></div><span>Party A</span></div>
                <div className="sig-block"><div className="sig-line"></div><span>Party B</span></div>
              </div>
            </div>
            <div className="floating-tag tag-1">⚡ Generated in seconds</div>
            <div className="floating-tag tag-2">🔒 Legally sound</div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container trust-bar__inner">
          <span>Used by professionals across</span>
          <div className="trust-bar__items">
            <span>Law Firms</span><span>·</span>
            <span>Startups</span><span>·</span>
            <span>Freelancers</span><span>·</span>
            <span>Real Estate</span><span>·</span>
            <span>HR Teams</span>
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" className="section about">
        <div className="container about__inner">
          <div className="about__text">
            <span className="label">Who We Are</span>
            <h2>Your Trusted Legal Partner</h2>
            <p>LegalHelp is an online platform built to make professional legal agreements accessible to everyone — from solo freelancers to growing businesses.</p>
            <p>Every template is reviewed by qualified lawyers and kept up-to-date with current legislation. Our guided builder ensures you never miss a critical clause.</p>
            <Link href="/builder" className="btn btn--primary" style={{marginTop:'1.5rem'}}>Start Building</Link>
          </div>
          <div className="about__stats">
            <div className="stat"><strong>10,000+</strong><span>Agreements created</span></div>
            <div className="stat"><strong>50+</strong><span>Lawyer-reviewed templates</span></div>
            <div className="stat"><strong>4</strong><span>Agreement types available</span></div>
            <div className="stat"><strong>98%</strong><span>Customer satisfaction</span></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section services">
        <div className="container">
          <span className="label center">What We Offer</span>
          <h2 className="center">Our Services</h2>
          <p className="section-sub center">Everything you need to create, sign, and manage professional legal documents.</p>
          <div className="services__grid">
            <div className="card">
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1a56db" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="#1a56db" strokeWidth="2"/><line x1="8" y1="13" x2="16" y2="13" stroke="#1a56db" strokeWidth="2"/><line x1="8" y1="17" x2="12" y2="17" stroke="#1a56db" strokeWidth="2"/></svg></div>
              <h3>Agreement Templates</h3>
              <p>50+ lawyer-reviewed templates covering NDA, employment, freelance, lease agreements and more.</p>
            </div>
            <div className="card card--highlight">
              <div className="card__badge-new">New</div>
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1a56db" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h3>Sample Builder</h3>
              <p>Answer guided questions and generate a real, customised agreement document in seconds — no signup required.</p>
              <Link href="/builder" className="card__link">Try it now →</Link>
            </div>
            <div className="card">
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1a56db" strokeWidth="2"/></svg></div>
              <h3>e-Signature</h3>
              <p>Send agreements for legally binding e-signatures and track signing status in real time.</p>
            </div>
            <div className="card">
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#1a56db" strokeWidth="2"/><path d="M8 21h8M12 17v4" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h3>Document Storage</h3>
              <p>Securely store all signed agreements in one place, accessible from any device at any time.</p>
            </div>
            <div className="card">
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1a56db" strokeWidth="2"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#1a56db" strokeWidth="2"/></svg></div>
              <h3>Renewal Alerts</h3>
              <p>Never miss a renewal. Get notified automatically before key contract milestones and expiry dates.</p>
            </div>
            <div className="card">
              <div className="card__icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#1a56db" strokeWidth="2"/></svg></div>
              <h3>Legal Guidance</h3>
              <p>Plain-English explanations for every clause, so you always understand exactly what you&apos;re agreeing to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="section how">
        <div className="container">
          <span className="label center">Simple Process</span>
          <h2 className="center">From Idea to Signed Document in Minutes</h2>
          <p className="section-sub center">No legal jargon. No wasted time. Just a clean, guided process.</p>
          <div className="how__steps">
            <div className="step">
              <div className="step__num">1</div>
              <h3>Choose Agreement Type</h3>
              <p>Select from Mutual NDA, Employment Contract, Freelance Agreement, or Lease Agreement.</p>
            </div>
            <div className="step__arrow">→</div>
            <div className="step">
              <div className="step__num">2</div>
              <h3>Fill In Your Details</h3>
              <p>Enter party names, dates, and key terms through our clean, guided form.</p>
            </div>
            <div className="step__arrow">→</div>
            <div className="step">
              <div className="step__num">3</div>
              <h3>Preview &amp; Download</h3>
              <p>Review the generated document, then download it as a PDF instantly.</p>
            </div>
          </div>
          <div className="how__cta">
            <Link href="/builder" className="btn btn--primary btn--lg">Build Your Agreement Now</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section testimonials">
        <div className="container">
          <span className="label center">What People Say</span>
          <h2 className="center">Trusted by Thousands</h2>
          <div className="testimonials__grid">
            <div className="testimonial">
              <div className="testimonial__stars">★★★★★</div>
              <p>&ldquo;LegalHelp saved me hours of back-and-forth with a solicitor. I had a professional NDA ready in under 5 minutes.&rdquo;</p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">SR</div>
                <div><strong>Sarah R.</strong><span>Freelance Designer</span></div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial__stars">★★★★★</div>
              <p>&ldquo;The employment contract template was exactly what our startup needed. Clear, complete, and customisable.&rdquo;</p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">JM</div>
                <div><strong>James M.</strong><span>Startup Founder</span></div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial__stars">★★★★★</div>
              <p>&ldquo;As a property manager, the lease agreement builder is invaluable. I use it for every new tenancy.&rdquo;</p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">AP</div>
                <div><strong>Alex P.</strong><span>Property Manager</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to Draft Your Agreement?</h2>
            <p>No account required. Create a professional sample in seconds.</p>
          </div>
          <Link href="/builder" className="btn btn--white btn--lg">Start Building Free</Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <div className="container contact__inner">
          <div className="contact__text">
            <span className="label">Get In Touch</span>
            <h2>Have a Question?</h2>
            <p>Need a bespoke document or have a question about our services? Our team is here to help.</p>
            <ul className="contact__details">
              <li><span>📧</span> hello@legalhelp.io</li>
              <li><span>📞</span> +1 (800) 555-0199</li>
              <li><span>🏢</span> 123 Legal Lane, New York, NY 10001</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
