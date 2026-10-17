import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { contactService } from '../services/contactService';

export const ContactInfo: React.FC = () => {
  const info = contactService.getClinicInfo();

  return (
    <div className="contact-info">
      <h2>Clinic Information</h2>
      <p>We are conveniently located near the premier Ayurveda learning and healing facilities in Kottakkal.</p>

      <div className="contact-cards">
        <Card className="contact-info-card">
          <div className="contact-info-card__icon"><MapPin size={22} /></div>
          <div>
            <h4>Clinic Address</h4>
            <p>{info.address}</p>
          </div>
        </Card>

        <Card className="contact-info-card">
          <div className="contact-info-card__icon"><Phone size={22} /></div>
          <div>
            <h4>Telephone & WhatsApp</h4>
            <a href={`tel:${info.phone.replace(/\s+/g, '')}`}>{info.phone}</a>
          </div>
        </Card>

        <Card className="contact-info-card">
          <div className="contact-info-card__icon"><Mail size={22} /></div>
          <div>
            <h4>Email Support</h4>
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
        </Card>

        <Card className="contact-info-card">
          <div className="contact-info-card__icon"><Clock size={22} /></div>
          <div>
            <h4>Clinical Hours</h4>
            {info.hours.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
