import React, { useState, useCallback } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useContact } from '../hooks/useContact';
import type { ContactMessage } from '../types';

export const ContactForm: React.FC = React.memo(() => {
  const [form, setForm] = useState<ContactMessage>({ name: '', email: '', phone: '', message: '' });
  const { sendMessage, loading, success, reset } = useContact();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      await sendMessage(form);
      setTimeout(() => {
        reset();
        setForm({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch {
      // Handled in hook
    }
  }, [form, sendMessage, reset]);

  return (
    <div className="contact-form-wrapper">
      <Card className="contact-form-card">
        <h3>Send a Message</h3>
        <p>Have an inquiry about consultations, classical treatments, or yoga sessions?</p>

        {success ? (
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
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contactPhone">Phone Number</label>
              <input
                id="contactPhone"
                type="tel"
                placeholder="+91..."
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              <Send size={16} />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

