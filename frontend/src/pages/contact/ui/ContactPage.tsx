import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/widgets/navbar';
import { Footer } from '@/widgets/footer';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import './ContactPage.css';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 2500);
  };

  return (
    <div className="contact-page">
      <Navbar />

      <header className="page-hero">
        <div className="page-hero__container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero__badge"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-hero__title"
          >
            Contact & Location
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Visit our physical clinic in Kottakkal or connect directly with our patient care support team.
          </motion.p>
        </div>
      </header>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Clinic Information</h2>
              <p>We are conveniently located near the premier Ayurveda learning and healing facilities in Kottakkal.</p>

              <div className="contact-cards">
                <Card className="contact-info-card">
                  <div className="contact-info-card__icon"><MapPin size={22} /></div>
                  <div>
                    <h4>Clinic Address</h4>
                    <p>Near Ayurveda College, Kottakkal, Malappuram, Pin: 676501, Kerala, India</p>
                  </div>
                </Card>

                <Card className="contact-info-card">
                  <div className="contact-info-card__icon"><Phone size={22} /></div>
                  <div>
                    <h4>Telephone & WhatsApp</h4>
                    <a href="tel:+919544260145">+91 9544 260 145</a>
                  </div>
                </Card>

                <Card className="contact-info-card">
                  <div className="contact-info-card__icon"><Mail size={22} /></div>
                  <div>
                    <h4>Email Support</h4>
                    <a href="mailto:info@jeevayurniketan.com">info@jeevayurniketan.com</a>
                  </div>
                </Card>

                <Card className="contact-info-card">
                  <div className="contact-info-card__icon"><Clock size={22} /></div>
                  <div>
                    <h4>Clinical Hours</h4>
                    <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <Card className="contact-form-card">
                <h3>Send a Message</h3>
                <p>Have an inquiry about treatments, Smriti meditation training, or admissions?</p>

                {submitted ? (
                  <div className="contact-form__success">
                    <CheckCircle2 size={44} className="contact-form__success-icon" />
                    <h4>Message Sent Successfully</h4>
                    <p>Thank you for reaching out. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form__field">
                      <label htmlFor="contactName">Your Name</label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contactEmail">Email Address</label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contactPhone">Phone Number</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        placeholder="+91..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contactMessage">Your Message</label>
                      <textarea
                        id="contactMessage"
                        rows={4}
                        required
                        placeholder="How can we assist you?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" variant="primary">
                      <Send size={16} />
                      <span>Send Message</span>
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
