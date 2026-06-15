'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form__group">
          <label htmlFor="contact-name">Your Name</label>
          <input id="contact-name" type="text" placeholder="John Smith" required />
        </div>
        <div className="form__group">
          <label htmlFor="contact-email">Email Address</label>
          <input id="contact-email" type="email" placeholder="john@example.com" required />
        </div>
      </div>
      <div className="form__group">
        <label htmlFor="contact-subject">Subject</label>
        <select id="contact-subject">
          <option>General Enquiry</option>
          <option>Bespoke Document Request</option>
          <option>Technical Support</option>
          <option>Partnership</option>
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" rows={4} placeholder="How can we help you?"></textarea>
      </div>
      <button type="submit" className="btn btn--primary">Send Message</button>
      {success && <p className="form__success">Thanks! We&apos;ll be in touch within 24 hours.</p>}
    </form>
  );
}
