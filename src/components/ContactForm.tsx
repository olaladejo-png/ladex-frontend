'use client';

import { useState } from 'react';

const SERVICES = [
  'Equipment Sourcing and Supply',
  'Technical Representation',
  'Engineering Consulting & Project Support',
  'Inspection & Procurement Services',
  'Agricultural & Poultry Solutions',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    subject: '',
    message: '',
  });

  const set = (field: string, val: string) => setFormData(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Save to Strapi admin
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to submit');

      // Send email notification (fire and forget — don't block on failure)
      fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          subject: formData.subject,
          message: formData.message,
        }),
      }).catch(() => {});

      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', service: SERVICES[0], subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <style>{`
        .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
        .cf-full { margin-bottom: 1.25rem; }
        .cf-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .cf-label { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; }
        .cf-input, .cf-select, .cf-textarea {
          width: 100%; padding: 0.875rem 1rem;
          border: 1.5px solid var(--border); border-radius: var(--radius-sm);
          font-family: inherit; font-size: 0.95rem; color: var(--text-primary);
          background: #fff; transition: border-color .15s, box-shadow .15s;
        }
        .cf-input:focus, .cf-select:focus, .cf-textarea:focus {
          outline: none; border-color: var(--ladex-gold);
          box-shadow: 0 0 0 3px rgba(201,162,39,0.12);
        }
        .cf-textarea { min-height: 140px; resize: vertical; }
        .cf-alert { padding: 0.875rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-weight: 600; font-size: 0.95rem; }
        .cf-alert-success { background: #dcfce7; color: #166534; }
        .cf-alert-error { background: #fee2e2; color: #991b1b; }
        @media (max-width: 600px) { .cf-grid { grid-template-columns: 1fr; } }
      `}</style>

      {status === 'success' && (
        <div className="cf-alert cf-alert-success">
          Message sent! We will get back to you within 48 business hours.
        </div>
      )}
      {status === 'error' && (
        <div className="cf-alert cf-alert-error">
          Something went wrong. Please try again or email us at sales@ladexgroup.com
        </div>
      )}

      <div className="cf-grid">
        <div className="cf-group">
          <label className="cf-label">Full Name *</label>
          <input className="cf-input" type="text" placeholder="John Doe" required value={formData.fullName} onChange={e => set('fullName', e.target.value)} />
        </div>
        <div className="cf-group">
          <label className="cf-label">Email Address *</label>
          <input className="cf-input" type="email" placeholder="john@company.com" required value={formData.email} onChange={e => set('email', e.target.value)} />
        </div>
      </div>

      <div className="cf-grid">
        <div className="cf-group">
          <label className="cf-label">Phone Number</label>
          <input className="cf-input" type="tel" placeholder="+234 800 000 0000" value={formData.phone} onChange={e => set('phone', e.target.value)} />
        </div>
        <div className="cf-group">
          <label className="cf-label">Service Needed *</label>
          <select className="cf-select" required value={formData.service} onChange={e => set('service', e.target.value)}>
            {SERVICES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="cf-full">
        <div className="cf-group">
          <label className="cf-label">Subject *</label>
          <input className="cf-input" type="text" placeholder="Brief subject of your enquiry" required value={formData.subject} onChange={e => set('subject', e.target.value)} />
        </div>
      </div>

      <div className="cf-full">
        <div className="cf-group">
          <label className="cf-label">Your Message *</label>
          <textarea className="cf-textarea" placeholder="Share your requirement, specification, and timeline..." required value={formData.message} onChange={e => set('message', e.target.value)} />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
