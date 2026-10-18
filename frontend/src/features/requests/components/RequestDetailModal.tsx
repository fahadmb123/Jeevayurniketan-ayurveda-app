import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Video,
  Check,
  UserCheck,
  AlertCircle,
  FileText,
  Activity,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { StatusPill } from '@/shared/ui/status-pill';
import type { PatientRequest } from '../types';
import './RequestDetailModal.css';

export interface RequestDetailModalProps {
  request: PatientRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (request: PatientRequest) => void;
  onReject: (request: PatientRequest) => void;
  isProcessing?: boolean;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = React.memo(({
  request,
  isOpen,
  onClose,
  onAccept,
  onReject,
  isProcessing = false,
}) => {
  const statusVariant = React.useMemo(() => {
    if (!request) return 'info';
    switch (request.status) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'danger';
      default:
        return 'info';
    }
  }, [request]);

  if (!request) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="consult-detail-backdrop" onClick={onClose}>
          <motion.div
            className="consult-detail-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="consult-detail-modal__header">
              <div className="consult-detail-modal__title-wrap">
                <div className="consult-detail-modal__avatar">
                  {request.patientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="consult-detail-modal__name-row">
                    <h2 className="consult-detail-modal__name">{request.patientName}</h2>
                    <StatusPill
                      status={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      variant={statusVariant}
                    />
                  </div>
                  <span className="consult-detail-modal__sub">
                    {request.age} yrs • {request.gender} {request.city ? `• ${request.city}` : ''} • Ref: {request.id}
                  </span>
                </div>
              </div>
              <button
                className="consult-detail-modal__close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="consult-detail-modal__body">
              {/* Contact Grid */}
              <div className="consult-detail-modal__section">
                <h4 className="consult-detail-modal__section-title">
                  <Phone size={15} /> Patient Contact Details
                </h4>
                <div className="consult-detail-modal__contact-grid">
                  <a href={`tel:${request.phone}`} className="consult-detail-modal__contact-pill">
                    <Phone size={14} />
                    <span>{request.phone}</span>
                  </a>
                  <a href={`mailto:${request.email}`} className="consult-detail-modal__contact-pill">
                    <Mail size={14} />
                    <span>{request.email}</span>
                  </a>
                  {request.city && (
                    <div className="consult-detail-modal__contact-pill consult-detail-modal__contact-pill--static">
                      <MapPin size={14} />
                      <span>{request.city}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Details */}
              <div className="consult-detail-modal__section">
                <h4 className="consult-detail-modal__section-title">
                  <Calendar size={15} /> Consultation Preferences
                </h4>
                <div className="consult-detail-modal__schedule-card">
                  <div className="consult-detail-modal__schedule-item">
                    <span className="consult-detail-modal__item-label">Requested Therapy</span>
                    <strong className="consult-detail-modal__item-value text-primary-green">
                      {request.service}
                    </strong>
                  </div>
                  <div className="consult-detail-modal__schedule-item">
                    <span className="consult-detail-modal__item-label">Consultation Mode</span>
                    <span className="consult-detail-modal__mode-badge">
                      {request.mode === 'Video Call' ? <Video size={13} /> : <MapPin size={13} />}
                      {request.mode}
                    </span>
                  </div>
                  <div className="consult-detail-modal__schedule-item">
                    <span className="consult-detail-modal__item-label">Preferred Date</span>
                    <strong className="consult-detail-modal__item-value">
                      <Calendar size={13} /> {request.preferredDate}
                    </strong>
                  </div>
                  <div className="consult-detail-modal__schedule-item">
                    <span className="consult-detail-modal__item-label">Preferred Slot</span>
                    <strong className="consult-detail-modal__item-value">
                      <Clock size={13} /> {request.preferredTimeSlot}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Health Concern & Symptoms */}
              <div className="consult-detail-modal__section">
                <h4 className="consult-detail-modal__section-title">
                  <Activity size={15} /> Clinical Concerns & Symptoms
                </h4>
                <div className="consult-detail-modal__concern-box">
                  <p className="consult-detail-modal__concern-desc">{request.primaryConcern}</p>
                  {request.symptoms.length > 0 && (
                    <div className="consult-detail-modal__symptoms">
                      {request.symptoms.map((s, i) => (
                        <span key={i} className="consult-detail-modal__symptom-tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Patient Notes */}
              {request.notes && (
                <div className="consult-detail-modal__section">
                  <h4 className="consult-detail-modal__section-title">
                    <FileText size={15} /> Additional Patient Notes
                  </h4>
                  <div className="consult-detail-modal__notes-box">
                    <p>{request.notes}</p>
                  </div>
                </div>
              )}

              {/* Rejection Note */}
              {request.status === 'rejected' && request.rejectionReason && (
                <div className="consult-detail-modal__alert consult-detail-modal__alert--danger">
                  <AlertCircle size={16} />
                  <div>
                    <strong>Decline Reason:</strong> {request.rejectionReason}
                  </div>
                </div>
              )}

              {/* Accepted Note */}
              {request.status === 'accepted' && (
                <div className="consult-detail-modal__alert consult-detail-modal__alert--success">
                  <UserCheck size={16} />
                  <div>
                    <strong>Accepted:</strong> Enrolled into patient registry on{' '}
                    {request.acceptedAt || 'Recent'}.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="consult-detail-modal__footer">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>

              {request.status === 'pending' && (
                <div className="consult-detail-modal__action-group">
                  <Button
                    variant="outline"
                    className="consult-detail-modal__btn-reject"
                    onClick={() => {
                      onReject(request);
                    }}
                    disabled={isProcessing}
                  >
                    <X size={16} /> Decline Request
                  </Button>
                  <Button
                    variant="primary"
                    className="consult-detail-modal__btn-accept"
                    onClick={() => {
                      onAccept(request);
                    }}
                    disabled={isProcessing}
                  >
                    <Check size={16} /> Accept & Enroll Patient
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

RequestDetailModal.displayName = 'RequestDetailModal';
export const ConsultationDetailModal = RequestDetailModal;
